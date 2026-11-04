const assert = require('node:assert/strict');
const { test } = require('node:test');
const { checkAudit } = require('../scripts/audit.cjs');

const advisory = 'https://github.com/advisories/GHSA-mrhx-c7xc-m3w5';
const report = (vulnerabilities) => ({ metadata: { vulnerabilities: { total: Object.keys(vulnerabilities).length } }, vulnerabilities });
const finding = (name, via) => ({ severity: 'high', nodes: [`node_modules/${name}`], via });

test('a clean audit passes', () => {
	assert.deepEqual(checkAudit(report({})), []);
});

test('only the existing host Zod advisory is accepted', () => {
	assert.deepEqual(checkAudit(report({
		zod: finding('zod', [{ url: advisory }]),
		'n8n-workflow': finding('n8n-workflow', ['zod']),
	})), []);
});

test('a new advisory on Zod fails the check', () => {
	assert.equal(checkAudit(report({ zod: finding('zod', [{ url: 'https://github.com/advisories/new' }]) })).length, 1);
});

test('a critical severity escalation is not hidden', () => {
	assert.equal(checkAudit(report({ zod: { ...finding('zod', [{ url: advisory }]), severity: 'critical' } })).length, 1);
});

test('a second advisory or a different dependency is not hidden', () => {
	assert.equal(checkAudit(report({ zod: finding('zod', [{ url: advisory }, { url: 'new' }]) })).length, 1);
	assert.equal(checkAudit(report({ handlebars: finding('handlebars', [{ url: advisory }]) })).length, 1);
	assert.equal(checkAudit(report({ 'n8n-workflow': finding('n8n-workflow', ['other-package']) })).length, 1);
});

test('a nested copy of Zod is not accepted as the host dependency', () => {
	assert.equal(checkAudit(report({ zod: { nodes: ['node_modules/other/node_modules/zod'], via: [{ url: advisory }] } })).length, 1);
});

test('an incomplete or failed audit fails the check', () => {
	assert.throws(() => checkAudit({}), /complete report/);
	assert.throws(() => checkAudit({ error: { code: 'NETWORK' } }), /complete report/);
	assert.throws(() => checkAudit({ metadata: {}, vulnerabilities: {} }), /complete report/);
	assert.throws(() => checkAudit({ metadata: { vulnerabilities: { total: 1 } }, vulnerabilities: {} }), /complete report/);
});

const minimatchAdvisory = { name: 'minimatch', severity: 'moderate', url: 'https://github.com/advisories/GHSA-g3hv-75wg-m249' };
const devLock = { packages: { 'node_modules/minimatch': { dev: true }, 'node_modules/eslint': { dev: true } } };
const devFindings = {
	minimatch: { severity: 'moderate', nodes: ['node_modules/minimatch'], via: [minimatchAdvisory] },
	eslint: { severity: 'moderate', nodes: ['node_modules/eslint'], via: ['minimatch'] },
};
const beforeReview = new Date('2026-11-03T00:00:00Z');

test('a known dev-tool advisory is accepted before its review date', () => {
	assert.deepEqual(checkAudit(report(devFindings), devLock, beforeReview), []);
});

test('a known dev-tool advisory fails once a shipped dependency is affected', () => {
	const shipped = { packages: { ...devLock.packages, 'node_modules/minimatch': {} } };
	assert.equal(checkAudit(report(devFindings), shipped, beforeReview).length, 2);
});

test('a known dev-tool advisory fails after its review date', () => {
	assert.equal(checkAudit(report(devFindings), devLock, new Date('2027-02-02T00:00:00Z')).length, 2);
});

test('a new or escalated advisory on a dev tool fails the check', () => {
	const withVia = (via) => report({ minimatch: { ...devFindings.minimatch, via: [via] } });
	assert.equal(checkAudit(withVia({ ...minimatchAdvisory, url: 'https://github.com/advisories/new' }), devLock, beforeReview).length, 1);
	assert.equal(checkAudit(withVia({ ...minimatchAdvisory, severity: 'high' }), devLock, beforeReview).length, 1);
	assert.equal(checkAudit(withVia({ ...minimatchAdvisory, name: 'glob' }), devLock, beforeReview).length, 1);
});

test('the host Zod advisory fails after its review date', () => {
	const zodReport = report({ zod: finding('zod', [{ url: advisory }]) });
	assert.deepEqual(checkAudit(zodReport, {}, beforeReview), []);
	assert.equal(checkAudit(zodReport, {}, new Date('2027-02-02T00:00:00Z')).length, 1);
});

test('a dependency cycle or an empty finding does not hide an advisory', () => {
	const cycle = report({
		...devFindings,
		eslint: { ...devFindings.eslint, via: ['minimatch', 'plugin'] },
		plugin: { severity: 'moderate', nodes: ['node_modules/plugin'], via: ['eslint', { url: 'https://github.com/advisories/new', severity: 'moderate', name: 'plugin' }] },
	});
	const lock = { packages: { ...devLock.packages, 'node_modules/plugin': { dev: true } } };
	assert.deepEqual(checkAudit(cycle, lock, beforeReview).map(([name]) => name).sort(), ['eslint', 'plugin']);
	assert.equal(checkAudit(report({ minimatch: { ...devFindings.minimatch, nodes: [] } }), devLock, beforeReview).length, 1);
	assert.equal(checkAudit(report({ minimatch: { ...devFindings.minimatch, via: [{ severity: 'moderate' }] } }), devLock, beforeReview).length, 1);
});
