const assert = require('node:assert/strict');
const { test } = require('node:test');
const { Linter } = require('eslint');

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
