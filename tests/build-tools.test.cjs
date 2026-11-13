const assert = require('node:assert/strict');
const { test } = require('node:test');
const { Linter } = require('eslint');

test('the FTP build dependency ignores an unknown __proto__ directory fact', () => {
	const { parseList } = require('basic-ftp');
	const listing = 'type=file;size=5;modify=20261113000000; report.txt';
	const files = parseList(listing);

	assert.equal(files.length, 1);
	assert.equal(files[0].name, 'report.txt');
	assert.equal(files[0].size, 5);
	assert.equal(files[0].isFile, true);
	assert.deepEqual(parseList(`__proto__=ignored;${listing}`), files);
});

test('the import linter matches allowed module paths', async () => {
	const { default: plugin } = await import('eslint-plugin-import-x');
	const rule = 'import-x/no-internal-modules';
	const source = "import '../nodes/Ipgeolocation/operations/getAbuseInfo.ts';";
	const linter = new Linter();

	function check(allow) {
		return linter.verify(source, [{
			files: ['**/*.mjs'],
			plugins: { 'import-x': plugin },
			rules: { [rule]: ['error', { allow }] },
		}], { filename: 'tests/probe.mjs' }).map((message) => message.ruleId);
	}

	assert.deepEqual(check(['**/operations/**']), []);
	assert.deepEqual(check(['**/other/**']), [rule]);
});
