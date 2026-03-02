import { INodeProperties } from 'n8n-workflow';

export const getIPSecurity: INodeProperties[] = [
	{
		displayName: 'IP Address',
		name: 'ipSecurity',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. 8.8.8.8',
		hint: 'Enter a valid IPv4 or IPv6 address',
		displayOptions: {
			show: {
				operation: ['getIpSecurityInfo'],
			},
		},
		description: 'The IP address to look up',
		routing: {
			request: {
				qs: {
					ip: '={{$parameter["ipSecurity"]}}',
				},
			},
		},
	},
	{
		displayName: 'Fields',
		name: 'IpSecurityFields',
		type: 'string',
		default: '',
		placeholder: 'e.g., security.threat_score,security.is_vpn',
		hint: 'Comma-separated list of fields to return in the response. Use dot notation for nested fields (e.g. security.is_tor, security.threat_score). Leave empty to return all fields.',
		displayOptions: {
			show: {
				operation: ['getIpSecurityInfo'],
			},
		},
		description: 'Defines which fields should be included in the API response',
		routing: {
			request: {
				qs: {
					fields: '={{$parameter["IpSecurityFields"]}}',
				},
			},
		},
	},
	{
		displayName: 'Exclude',
		name: 'IpSecurityExclude',
		type: 'string',
		default: '',
		placeholder: 'e.g., security.threat_score,security.is_relay',
		hint: 'Comma-separated list of fields to exclude from the response. Use dot notation for nested fields (e.g. security.threat_score,security.is_relay).',
		displayOptions: {
			show: {
				operation: ['getIpSecurityInfo'],
			},
		},
		description: 'Defines which fields should be excluded from the API response',
		routing: {
			request: {
				qs: {
					excludes: '={{$parameter["IpSecurityExclude"]}}',
				},
			},
		},
	},
];
