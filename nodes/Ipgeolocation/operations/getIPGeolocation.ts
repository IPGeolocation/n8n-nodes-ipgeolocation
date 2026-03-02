import { INodeProperties } from 'n8n-workflow';

export const getIPGeolocation: INodeProperties[] = [
	{
		displayName: 'IP Address',
		name: 'ipGeolocation',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. 8.8.8.8',
		hint: 'Enter a valid IPv4 or IPv6 address',
		displayOptions: {
			show: {
				operation: ['getIpInfo'],
			},
		},
		description: 'The IP address to look up',
		routing: {
			request: {
				qs: {
					ip: '={{$parameter["ipGeolocation"]}}',
				},
			},
		},
	},
	{
		displayName: 'Include',
		name: 'ipGeolocationInclude',
		type: 'options',
		options: [
			{ name: 'Abuse', value: 'abuse' },
			{ name: 'All', value: 'all' },
			{ name: 'DMA Code', value: 'dma_code' },
			{ name: 'Geo Accuracy', value: 'geo_accuracy' },
			{ name: 'Security', value: 'security' },
			{ name: 'User Agent', value: 'user_agent' },
		],
		typeOptions: {
			multipleValues: true,
		},
		default: 'all',
		hint: 'Select the information to include in the response (Paid Plan)',
		displayOptions: {
			show: {
				operation: ['getIpInfo'],
			},
		},
		description:
			'Choose which fields to include in the response. Select multiple options if needed. Selecting "All" will include all available fields',
		routing: {
			request: {
				qs: {
					include: '={{$parameter["ipGeolocationInclude"].join(",")}}',
				},
			},
		},
	},
	{
		displayName: 'Fields',
		name: 'ipGeolocationFields',
		type: 'string',
		default: '',
		placeholder: 'e.g., location,security.threat_score,asn.organization,abuse.emails',
		hint: 'Comma-separated list of fields to return in the response. Use dot notation for nested fields (e.g. location.city, security.threat_score). Leave empty to return all fields.',
		displayOptions: {
			show: {
				operation: ['getIpInfo'],
			},
		},
		description: 'Defines which fields should be included in the API response',
		routing: {
			request: {
				qs: {
					fields: '={{$parameter["ipGeolocationFields"]}}',
				},
			},
		},
	},
	{
		displayName: 'Exclude',
		name: 'ipGeolocationExclude',
		type: 'string',
		default: '',
		placeholder: 'e.g., location,security.threat_score,asn.organization,abuse.emails',
		hint: 'Comma-separated list of fields to exclude from the response. Use dot notation for nested fields (e.g. location.city, security.threat_score).',
		displayOptions: {
			show: {
				operation: ['getIpInfo'],
			},
		},
		description: 'Defines which fields should be excluded from the API response',
		routing: {
			request: {
				qs: {
					excludes: '={{$parameter["ipGeolocationExclude"]}}',
				},
			},
		},
	},
];
