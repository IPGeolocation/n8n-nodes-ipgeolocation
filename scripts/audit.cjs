const { spawnSync } = require('node:child_process');

const hostAdvisory = 'https://github.com/advisories/GHSA-mrhx-c7xc-m3w5';

function isHostZodFinding(name, finding) {
	// shortcut: accept only n8n's Zod 3 advisory until a compatible fix is available.
	// https://github.com/colinhacks/zod/issues/6653
	return (
		finding.nodes.length === 1 &&
		finding.nodes[0] === `node_modules/${name}` &&
		finding.via.length === 1 &&
		((name === 'zod' && finding.via[0].url === hostAdvisory) ||
			(name === 'n8n-workflow' && finding.via[0] === 'zod'))
	);
}

function checkAudit(report) {
	if (report.error || !report.metadata || !report.vulnerabilities) {
		throw new Error('npm audit did not return a complete report');
	}
	return Object.entries(report.vulnerabilities).filter(
		([name, finding]) => !isHostZodFinding(name, finding),
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
		const unexpected = checkAudit(report);
		for (const [name, finding] of Object.entries(report.vulnerabilities)) {
			console.log(`${name}: ${finding.severity}${isHostZodFinding(name, finding) ? ' (upstream n8n/Zod advisory)' : ''}`);
		}
		if (unexpected.length) process.exitCode = 1;
	} catch (error) {
		console.error(error.message);
		process.exitCode = 1;
	}
}

module.exports = { checkAudit };
