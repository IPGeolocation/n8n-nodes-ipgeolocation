const assert = require('node:assert/strict');
const { test } = require('node:test');
const { checkAudit } = require('../scripts/audit.cjs');

const advisory = 'https://github.com/advisories/GHSA-mrhx-c7xc-m3w5';
const beforeReview = new Date('2026-11-03T00:00:00Z');
const report = (vulnerabilities) => ({ metadata: { vulnerabilities: { total: Object.keys(vulnerabilities).length } }, vulnerabilities });
const finding = (name, via, severity = 'high') => ({ severity, nodes: [`node_modules/${name}`], via });

test('a clean audit passes', () => {
	assert.deepEqual(checkAudit(report({})), []);
});

test('only the existing host Zod advisory is accepted', () => {
	assert.deepEqual(checkAudit(report({
		zod: finding('zod', [{ url: advisory }]),
		'n8n-workflow': finding('n8n-workflow', ['zod']),
	}), beforeReview), []);
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
	assert.equal(checkAudit(report({ zod: { ...finding('zod', [{ url: advisory }]), nodes: ['node_modules/other/node_modules/zod'] } })).length, 1);
});

test('an incomplete or failed audit fails the check', () => {
	assert.throws(() => checkAudit({}), /complete report/);
	assert.throws(() => checkAudit({ metadata: { vulnerabilities: { total: 0 } }, vulnerabilities: '' }), /complete report/);
	assert.throws(() => checkAudit({ error: { code: 'NETWORK' } }), /complete report/);
	assert.throws(() => checkAudit({ metadata: {}, vulnerabilities: {} }), /complete report/);
	assert.throws(() => checkAudit({ metadata: { vulnerabilities: { total: 1 } }, vulnerabilities: {} }), /complete report/);
});

test('development advisories and the tools that use them fail the check', () => {
	const issues = report({
		glob: finding('glob', [{ url: 'https://github.com/advisories/GHSA-3g3m-2fjr-6pw4' }], 'moderate'),
		minimatch: finding('minimatch', [{ url: 'https://github.com/advisories/GHSA-g3hv-75wg-m249' }], 'moderate'),
		eslint: finding('eslint', ['minimatch'], 'moderate'),
	});
	assert.deepEqual(checkAudit(issues, beforeReview).map(([name]) => name), ['glob', 'minimatch', 'eslint']);
});

test('a workflow advisory needs the matching host Zod finding', () => {
	const workflow = finding('n8n-workflow', ['zod']);
	assert.equal(checkAudit(report({ 'n8n-workflow': workflow }), beforeReview).length, 1);
});

test('the host Zod advisory fails after its review date', () => {
	const issues = report({ zod: finding('zod', [{ url: advisory }]) });
	assert.deepEqual(checkAudit(issues, beforeReview), []);
	assert.equal(checkAudit(issues, new Date('2027-02-02T00:00:00Z')).length, 1);
});
