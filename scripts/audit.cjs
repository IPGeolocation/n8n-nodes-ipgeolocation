const { spawnSync } = require('node:child_process');

const hostAdvisory = 'https://github.com/advisories/GHSA-mrhx-c7xc-m3w5';
const hostReview = '2027-02-01';

// Dev-tool advisories with no upstream fix yet (eslint, @eslint/eslintrc and @n8n/node-cli still need
// minimatch below 11.0.1). Accepted only while every affected copy is a dev dependency, and only until
// the review date, so they get checked again instead of being ignored for good.
const devAdvisories = {
	'https://github.com/advisories/GHSA-3g3m-2fjr-6pw4': { name: 'glob', severity: 'moderate', review: '2027-02-01' },
	'https://github.com/advisories/GHSA-g3hv-75wg-m249': { name: 'minimatch', severity: 'moderate', review: '2027-02-01' },
};

function isHostZodFinding(name, finding, today = new Date()) {
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

function isDevAdvisoryFinding(name, report, lock, today, seen = new Set()) {
	if (seen.has(name)) return true; // already checked, or a dependency cycle
	seen.add(name);
	const finding = report.vulnerabilities[name];
	if (!finding?.via?.length || !finding.nodes?.length || !finding.nodes.every((node) => lock.packages?.[node]?.dev === true)) return false;
	return finding.via.every((via) => {
		if (typeof via === 'string') return isDevAdvisoryFinding(via, report, lock, today, seen);
		const accepted = devAdvisories[via.url];
		return (
			accepted !== undefined &&
			accepted.name === via.name &&
			accepted.severity === via.severity &&
			today <= new Date(`${accepted.review}T23:59:59Z`)
		);
	});
}

function checkAudit(report, lock = {}, today = new Date()) {
	if (
		report.error ||
		!Number.isInteger(report.metadata?.vulnerabilities?.total) ||
		!report.vulnerabilities ||
		Array.isArray(report.vulnerabilities) ||
		report.metadata.vulnerabilities.total !== Object.keys(report.vulnerabilities).length
	) {
		throw new Error('npm audit did not return a complete report');
	}
	return Object.entries(report.vulnerabilities).filter(
		([name, finding]) => !isHostZodFinding(name, finding, today) && !isDevAdvisoryFinding(name, report, lock, today),
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
		const unexpected = new Set(checkAudit(report, require('../package-lock.json')).map(([name]) => name));
		for (const [name, finding] of Object.entries(report.vulnerabilities)) {
			const note = isHostZodFinding(name, finding)
				? ' (upstream n8n/Zod advisory)'
				: unexpected.has(name)
					? ' (NOT ACCEPTED: new, shipped, escalated or past its review date)'
					: ' (dev-only, accepted until its review date in scripts/audit.cjs)';
			console.log(`${name}: ${finding.severity}${note}`);
		}
		if (unexpected.size) process.exitCode = 1;
	} catch (error) {
		console.error(error.message);
		process.exitCode = 1;
	}
}

module.exports = { checkAudit };
