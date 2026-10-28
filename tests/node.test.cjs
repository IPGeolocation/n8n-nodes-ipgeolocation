const assert = require('node:assert/strict');
const { test } = require('node:test');
const { Workflow, NodeHelpers } = require('n8n-workflow');
const { Ipgeolocation } = require('../dist/nodes/Ipgeolocation/Ipgeolocation.node.js');
const { IpgeolocationApi } = require('../dist/credentials/IpgeolocationApi.credentials.js');

const description = new Ipgeolocation().description;
const routes = {
	getAbuseInfo: ['GET', '/v3/abuse'],
	getAsnInfo: ['GET', '/v3/asn'],
	getAstronomy: ['GET', '/v3/astronomy'],
	getAstronomyTimeseries: ['GET', '/v3/astronomy/timeSeries'],
	getBulkIpGeolocation: ['POST', '/v3/ipgeo-bulk'],
	getBulkIPSecurity: ['POST', '/v3/security-bulk'],
	getBulkUserAgent: ['POST', '/v3/user-agent-bulk'],
	getIpInfo: ['GET', '/v3/ipgeo'],
	getIpSecurityInfo: ['GET', '/v3/security'],
	getTimeConversion: ['GET', '/v3/timezone/convert'],
	getTimezone: ['GET', '/v3/timezone'],
	getUserAgent: ['POST', '/v3/user-agent'],
};

test('existing workflows keep the same node, credential and operation identifiers', () => {
	assert.equal(description.name, 'ipgeolocation');
	assert.equal(description.version, 1);
	assert.deepEqual(description.inputs, ['main']);
	assert.deepEqual(description.outputs, ['main']);
	assert.deepEqual(description.credentials, [{ name: 'ipgeolocationApi', required: true }]);
	assert.equal(description.requestDefaults.baseURL, 'https://api.ipgeolocation.io');
	const operation = description.properties.find((p) => p.name === 'operation');
	assert.equal(operation.default, 'getIpInfo');
	assert.deepEqual(operation.options.map((o) => o.value).sort(), Object.keys(routes).sort());
});

for (const [operation, [method, url]] of Object.entries(routes)) {
	test(`${operation} keeps its HTTP method and endpoint`, () => {
		const option = description.properties.find((p) => p.name === 'operation').options.find((o) => o.value === operation);
		assert.deepEqual(option.routing.request, { method, url });
	});
}

function resolveProperty(name, parameters) {
	const node = {
		id: 'test', name: 'IPGeolocation', type: 'n8n-nodes-ipgeolocation.ipgeolocation',
		typeVersion: 1, position: [0, 0], parameters,
	};
	const workflow = new Workflow({
		id: 'test', nodes: [node], connections: {}, active: false,
		nodeTypes: { getByNameAndVersion: () => ({ description }) },
	});
	const property = description.properties.find((p) => p.name === name);
	assert.ok(NodeHelpers.displayParameter(node.parameters, property, node), `${name} is visible`);
	return workflow.expression.getParameterValue(property.routing.request, null, 0, 0, node.name, [{ json: {} }], 'manual', {});
}

const ips = ['8.8.8.8', '2001:4860:4860::8888'];
for (const [operation, property, field] of [
	['getBulkIpGeolocation', 'ipsBulkGeo', 'ipGeo'],
	['getBulkIPSecurity', 'ipsBulkSecurity', 'ipSec'],
]) {
	test(`${operation} preserves IPv4 and IPv6 in the JSON body`, () => {
		assert.deepEqual(resolveProperty(property, {
			operation, [property]: { values: ips.map((ip) => ({ [field]: ip })) },
		}), { method: 'POST', body: { ips } });
	});
}

test('bulk user agents stay an array of strings', () => {
	const uaStrings = ['Mozilla/5.0', 'curl/8.0'];
	assert.deepEqual(resolveProperty('uaStrings', {
		operation: 'getBulkUserAgent', uaStrings: { values: uaStrings.map((uaString) => ({ uaString })) },
	}), { body: { uaStrings } });
});

test('single user agent stays in the JSON body', () => {
	assert.deepEqual(resolveProperty('uaString', { operation: 'getUserAgent', uaString: 'Mozilla/5.0' }), { body: { uaString: 'Mozilla/5.0' } });
});

test('selected include fields stay comma separated', () => {
	assert.deepEqual(resolveProperty('ipGeolocationInclude', { operation: 'getIpInfo', ipGeolocationInclude: ['security', 'abuse'] }), { qs: { include: 'security,abuse' } });
});

for (const [mode, property, query, value] of [
	['tzName', 'timezoneName', 'tz', 'Asia/Karachi'],
	['address', 'address', 'location', 'London, United Kingdom'],
	['coords', 'latitudeTimezone', 'lat', 0],
	['coords', 'longitudeTimezone', 'long', -0.1278],
	['ipTimezone', 'ipTimezone', 'ip', ips[1]],
	['iata', 'iataTimezone', 'iata_code', 'LHR'],
	['icao', 'icaoTimezone', 'icao_code', 'EGLL'],
	['unlocode', 'unlocodeTimezone', 'lo_code', 'GBLON'],
]) {
	test(`timezone ${property} keeps its query parameter`, () => {
		assert.deepEqual(resolveProperty(property, { operation: 'getTimezone', timezoneQueryBy: mode, [property]: value }), { qs: { [query]: value } });
	});
}

for (const [mode, prefix] of [['timezone', 'tz'], ['coords', 'lat'], ['coords', 'long'], ['location', 'location'], ['iata', 'iata'], ['icao', 'icao'], ['locode', 'locode']]) {
	test(`time conversion keeps ${prefix} source and destination separate`, () => {
		for (const [direction, value] of [['from', mode === 'coords' ? 0 : 'source'], ['to', mode === 'coords' ? 51.5 : 'destination']]) {
			const field = `${prefix}_${direction}`;
			assert.deepEqual(resolveProperty(field, { operation: 'getTimeConversion', convertTimeBy: mode, [field]: value }), { qs: { [field]: value } });
		}
	});
}

for (const operation of ['getAstronomy', 'getAstronomyTimeseries']) {
	for (const [mode, property, query, value] of [
		['ipAstronomy', 'ipAstronomy', 'ip', ips[0]],
		['coords', 'latitudeAstronomy', 'lat', 0],
		['coords', 'longitudeAstronomy', 'long', -0.1278],
		['location', 'locationAstronomy', 'location', 'London'],
		['timezone', 'timezoneAstronomy', 'time_zone', 'Asia/Karachi'],
	]) {
		test(`${operation} ${property} keeps its query parameter`, () => {
			assert.deepEqual(resolveProperty(property, { operation, astronomyQueryBy: mode, [property]: value }), { qs: { [query]: value } });
		});
	}
}

test('astronomy time series keeps the date range', () => {
	for (const [property, query, value] of [['startDate', 'dateStart', '2026-10-01'], ['endDate', 'dateEnd', '2026-10-02']]) {
		assert.deepEqual(resolveProperty(property, { operation: 'getAstronomyTimeseries', [property]: value }), { qs: { [query]: value } });
	}
});

test('ASN lookup supports both ASN and IP inputs', () => {
	assert.deepEqual(resolveProperty('asn', { operation: 'getAsnInfo', asnQueryBy: 'asn', asn: 'AS15169' }), { qs: { asn: 'AS15169' } });
	assert.deepEqual(resolveProperty('ipAsn', { operation: 'getAsnInfo', asnQueryBy: 'ipAsn', ipAsn: ips[0] }), { qs: { ip: ips[0] } });
});

test('API key credentials and the credential check remain compatible', () => {
	const credential = new IpgeolocationApi();
	assert.equal(credential.name, 'ipgeolocationApi');
	assert.equal(credential.properties[0].name, 'apiKey');
	assert.equal(credential.properties[0].typeOptions.password, true);
	assert.equal(credential.authenticate.type, 'generic');
	assert.deepEqual(credential.authenticate.properties.qs, { apiKey: '={{$credentials.apiKey}}' });
	assert.equal(credential.test.request.baseURL, 'https://api.ipgeolocation.io');
	assert.equal(credential.test.request.url, '/v3/ipgeo');
	assert.deepEqual(credential.test.request.qs, { apiKey: '={{$credentials.apiKey}}', ip: '8.8.8.8' });
});
