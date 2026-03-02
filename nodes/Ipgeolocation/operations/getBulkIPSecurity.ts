import { INodeProperties } from 'n8n-workflow';

export const getBulkIPSecurity: INodeProperties[] = [
	{
		displayName: 'IP Addresses',
		name: 'ipsBulkSecurity',
		type: 'fixedCollection',
		required: true,
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		placeholder: 'Add IP Address',
		displayOptions: {
			show: {
				operation: ['getBulkIPSecurity'],
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
						name: 'ipSec',
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
					ips: '={{ $parameter["ipsBulkSecurity"].values.map(v => v.ipSec) }}',
				},
			},
		},
	},
	{
		displayName: 'Fields',
		name: 'bulkIpSecurityFields',
		type: 'string',
		default: '',
		placeholder: 'e.g., security.threat_score,security.is_vpn',
		hint: 'Comma-separated list of fields to return in the response. Use dot notation for nested fields (e.g. security.is_tor, security.threat_score). Leave empty to return all fields.',
		displayOptions: {
			show: {
				operation: ['getBulkIPSecurity'],
			},
		},
		description: 'Defines which fields should be included in the API response',
		routing: {
			request: {
				qs: {
					fields: '={{$parameter["bulkIpSecurityFields"]}}',
				},
			},
		},
	},
	{
		displayName: 'Exclude',
		name: 'bulkIpSecurityExclude',
		type: 'string',
		default: '',
		placeholder: 'e.g., security.threat_score,security.is_relay',
		hint: 'Comma-separated list of fields to exclude from the response. Use dot notation for nested fields (e.g. security.threat_score,security.is_relay).',
		displayOptions: {
			show: {
				operation: ['getBulkIPSecurity'],
			},
		},
		description: 'Defines which fields should be excluded from the API response',
		routing: {
			request: {
				qs: {
					excludes: '={{$parameter["bulkIpSecurityExclude"]}}',
				},
			},
		},
	},
];
