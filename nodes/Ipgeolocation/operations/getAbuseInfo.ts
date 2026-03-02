import { INodeProperties } from 'n8n-workflow';

export const getAbuseInfo: INodeProperties[] = [
	{
		displayName: 'IP Address',
		name: 'ipAbuse',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. 8.8.8.8',
		hint: 'Enter a valid IPv4 or IPv6 address',
		displayOptions: {
			show: {
				operation: ['getAbuseInfo'],
			},
		},
		description: 'The IP address to look up',
		routing: {
			request: {
				qs: {
					ip: '={{$parameter["ipAbuse"]}}',
				},
			},
		},
	},
	{
		displayName: 'Fields',
		name: 'abuseFields',
		type: 'string',
		default: '',
		placeholder: 'e.g., abuse.emails,abuse.kind',
		hint: 'Comma-separated list of fields to return in the response. Use dot notation for nested fields (e.g. abuse.emails). Leave empty to return all fields.',
		displayOptions: {
			show: {
				operation: ['getAbuseInfo'],
			},
		},
		description: 'Defines which fields should be included in the API response',
		routing: {
			request: {
				qs: {
					fields: '={{$parameter["abuseFields"]}}',
				},
			},
		},
	},
	{
		displayName: 'Exclude',
		name: 'abuseExclude',
		type: 'string',
		default: '',
		placeholder: 'e.g., abuse.emails,abuse.kind',
		hint: 'Comma-separated list of fields to exclude from the response. Use dot notation for nested fields (e.g. abuse.emails).',
		displayOptions: {
			show: {
				operation: ['getAbuseInfo'],
			},
		},
		description: 'Defines which fields should be excluded from the API response',
		routing: {
			request: {
				qs: {
					excludes: '={{$parameter["abuseExclude"]}}',
				},
			},
		},
	},
];
