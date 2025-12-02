import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { operations } from './operations';
import { getAsnInfo } from './operations/getAsnInfo';
import { getBulkUserAgents } from './operations/getBulkUserAgents';
import { getAstronomyAndTimeSeries } from './operations/getAstronomyAndTimeSeries';
import { getTimezoneAndConversion } from './operations/getTimezoneAndConversion';
import { getUserAgent } from './operations/getUserAgent';
import { getAbuseInfo } from './operations/getAbuseInfo';
import { getIPGeolocation } from './operations/getIPGeolocation';
import { getIPSecurity } from './operations/getIPSecurity';
import { getBulkIPGeolocation } from './operations/getBulkIPGeolocation';
import { getBulkIPSecurity } from './operations/getBulkIPSecurity';
export class Ipgeolocation implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'IPGeolocation',
		name: 'ipgeolocation',
		icon: { light: 'file:ipgeolocation-light.png', dark: 'file:ipgeolocation-dark.png' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Integrate ipgeolocation.io with n8n to automate IP lookup, geolocation, timezone data, and security checks for powerful workflow enrichment.',
		defaults: {
			name: 'ipgeolocation',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'ipgeolocationApi', required: true }],
		requestDefaults: {
			baseURL: 'https://api.ipgeolocation.io',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			...operations,
			...getIPGeolocation,
			...getBulkIPGeolocation,
			...getBulkIPSecurity,
			...getIPSecurity,
			...getAbuseInfo,
			...getAsnInfo,
			...getAstronomyAndTimeSeries,
			...getTimezoneAndConversion,
			...getUserAgent,
			...getBulkUserAgents
		],
	};
}
