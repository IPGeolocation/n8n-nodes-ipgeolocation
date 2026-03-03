import { INodeProperties } from 'n8n-workflow';

export const getBulkIPGeolocation: INodeProperties[] = [
	{
		displayName: 'IP Addresses',
		name: 'ipsBulkGeo',
		type: 'fixedCollection',
		required: true,
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		placeholder: 'Add IP Address',
		displayOptions: {
			show: {
				operation: ['getBulkIpGeolocation'],
			},
		},
		description: 'Add one or more IP addresses for bulk lookup (maximum 50,000)',
		options: [
			{
				name: 'values',
				displayName: 'IP Address',
				values: [
					{
						displayName: 'IP Address',
						name: 'ipGeo',
						type: 'string',
						required: true,
						default: '',
						placeholder: 'e.g., 8.8.8.8',
						hint: 'Enter a valid IPv4 or IPv6 address',
						description: 'A single IP address to include in the bulk lookup',
					},
				],
			},
		],
		routing: {
			request: {
				method: 'POST',
				body: {
					ips: '={{ $parameter["ipsBulkGeo"].values.map(v => v.ipGeo) }}',
				},
			},
		},
	},
	{
		displayName: 'Include',
		name: 'bulkIpGeolocationInclude',
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
		default: ['all'],
		hint: 'Select the information to include in the response (Paid Plan)',
		displayOptions: {
			show: {
				operation: ['getBulkIpGeolocation'],
			},
		},
		description:
			'Choose which fields to include in the response. Select multiple options if needed. Selecting "All" will include all available fields',
		routing: {
			request: {
				qs: {
					include: '={{$parameter["bulkIpGeolocationInclude"].join(",")}}',
				},
			},
		},
	},
	{
		displayName: 'Fields',
		name: 'bulkIpGeolocationFields',
		type: 'string',
		default: '',
		placeholder: 'e.g., location,security.threat_score,asn.organization,abuse.emails',
		hint: 'Comma-separated list of fields to return in the response. Use dot notation for nested fields (e.g. location.city, security.threat_score). Leave empty to return all fields.',
		displayOptions: {
			show: {
				operation: ['getBulkIpGeolocation'],
			},
		},
		description: 'Defines which fields should be included in the API response',
		routing: {
			request: {
				qs: {
					fields: '={{$parameter["bulkIpGeolocationFields"]}}',
				},
			},
		},
	},
	{
		displayName: 'Exclude',
		name: 'bulkIpGeolocationExclude',
		type: 'string',
		default: '',
		placeholder: 'e.g., location,security.threat_score,asn.organization,abuse.emails',
		hint: 'Comma-separated list of fields to exclude from the response. Use dot notation for nested fields (e.g. location.city, security.threat_score).',
		displayOptions: {
			show: {
				operation: ['getBulkIpGeolocation'],
			},
		},
		description: 'Defines which fields should be excluded from the API response',
		routing: {
			request: {
				qs: {
					excludes: '={{$parameter["bulkIpGeolocationExclude"]}}',
				},
			},
		},
	},
];
