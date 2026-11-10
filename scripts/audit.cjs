const { spawnSync } = require('node:child_process');

const hostAdvisory = 'https://github.com/advisories/GHSA-mrhx-c7xc-m3w5';
const hostReview = '2027-02-01';

function isHostZodFinding(name, finding, today) {
	// shortcut: accept only n8n's Zod 3 advisory until a compatible fix is available, and only until the
	// review date. https://github.com/colinhacks/zod/issues/6653
	return (
		today <= new Date(`${hostReview}T23:59:59Z`) &&
		finding.severity === 'high' &&
		finding.nodes.length === 1 &&
		finding.nodes[0] === `node_modules/${name}` &&
		finding.via.length === 1 &&
		((name === 'zod' && finding.via[0].url === hostAdvisory) ||
			(name === 'n8n-workflow' && finding.via[0] === 'zod'))
	);
}

function checkAudit(report, today = new Date()) {
	if (
		report.error ||
		!Number.isInteger(report.metadata?.vulnerabilities?.total) ||
		!report.vulnerabilities ||
		typeof report.vulnerabilities !== 'object' ||
		Array.isArray(report.vulnerabilities) ||
		report.metadata.vulnerabilities.total !== Object.keys(report.vulnerabilities).length
	) {
		throw new Error('npm audit did not return a complete report');
	}
	const findings = report.vulnerabilities;
	const knownZod = findings.zod && isHostZodFinding('zod', findings.zod, today);
	return Object.entries(findings).filter(([name, finding]) =>
		!knownZod || !isHostZodFinding(name, finding, today),
	);
}

if (require.main === module) {
	try {
		const result = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['audit', '--json'], {
			encoding: 'utf8',
		});
		if (result.error || ![0, 1].includes(result.status)) {
			throw result.error || new Error(result.stderr || 'npm audit failed');
		}
		const report = JSON.parse(result.stdout);
		const unexpected = new Set(checkAudit(report).map(([name]) => name));
		for (const [name, finding] of Object.entries(report.vulnerabilities)) {
			const note = unexpected.has(name) ? ' (requires attention)' : ' (upstream n8n/Zod advisory)';
			console.log(`${name}: ${finding.severity}${note}`);
		}
		if (unexpected.size) process.exitCode = 1;
	} catch (error) {
		console.error(error.message);
		process.exitCode = 1;
	}
}

module.exports = { checkAudit };
