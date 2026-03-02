import { INodeProperties } from 'n8n-workflow';

export const getAsnInfo: INodeProperties[] = [
	{
		displayName: 'Query ASN Information By',
		name: 'asnQueryBy',
		type: 'options',
		options: [
			{ name: 'ASN Number', value: 'asn' },
			{ name: 'IP Address', value: 'ipAsn' },
		],
		default: 'asn',
		displayOptions: {
			show: {
				operation: ['getAsnInfo'],
			},
		},
		description: 'Select whether to query ASN information by ASN number or IP address',
	},

	// ---------------------------
	// ASN Number input (shown only if Query By ASN)
	// ---------------------------
	{
		displayName: 'ASN Number',
		name: 'asn',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['getAsnInfo'],
				asnQueryBy: ['asn'],
			},
		},
		hint: 'Enter an ASN number',
		placeholder: 'e.g., 15169',
		description: 'The ASN number to look up',
		routing: {
			request: {
				qs: { asn: '={{$parameter["asn"]}}' },
			},
		},
	},

	// ---------------------------
	// IP Address input (shown only if Query By IP)
	// ---------------------------
	{
		displayName: 'IP Address',
		name: 'ipAsn',
		type: 'string',
		default: '',
		placeholder: 'e.g., 8.8.8.8',
		hint: 'Enter a valid IPv4 or IPv6 address',
		required: true,
		displayOptions: {
			show: {
				operation: ['getAsnInfo'],
				asnQueryBy: ['ipAsn'],
			},
		},
		description: 'The IP address to look up ASN information',
		routing: {
			request: {
				qs: { ip: '={{$parameter["ipAsn"]}}' },
			},
		},
	},
	{
		displayName: 'Include',
		name: 'ASNInclude',
		type: 'options',
		options: [
			{ name: 'All', value: 'all' },
			{ name: 'Downstreams', value: 'downstreams' },
			{ name: 'Peers', value: 'peers' },
			{ name: 'Routes', value: 'routes' },
			{ name: 'Upstreams', value: 'upstreams' },
			{ name: 'Whois Response', value: 'whois_response' },
		],
		typeOptions: {
			multipleValues: true,
		},
		default: 'all',
		hint: 'Select the information to include in the response',
		displayOptions: {
			show: {
				operation: ['getAsnInfo'],
			},
		},
		description:
			'Choose which fields to include in the response. Select multiple options if needed. Selecting "All" will include all available fields',
		routing: {
			request: {
				qs: {
					include: '={{$parameter["ASNInclude"].join(",")}}',
				},
			},
		},
	},
	{
		displayName: 'Fields',
		name: 'ASNFields',
		type: 'string',
		default: '',
		placeholder: 'e.g., asn.organization,asn.country,asn.downstreams',
		hint: 'Comma-separated list of fields to return in the response. Use dot notation for nested fields (e.g. asn.organization,asn.country,asn.downstreams). Leave empty to return all fields.',
		displayOptions: {
			show: {
				operation: ['getAsnInfo'],
			},
		},
		description: 'Defines which fields should be included in the API response',
		routing: {
			request: {
				qs: {
					fields: '={{$parameter["ASNFields"]}}',
				},
			},
		},
	},
	{
		displayName: 'Exclude',
		name: 'ASNExclude',
		type: 'string',
		default: '',
		placeholder: 'e.g., asn.date_allocated,asn.allocation_status',
		hint: 'Comma-separated list of fields to exclude from the response. Use dot notation for nested fields (e.g. asn.date_allocated,asn.allocation_status).',
		displayOptions: {
			show: {
				operation: ['getAsnInfo'],
			},
		},
		description: 'Defines which fields should be excluded from the API response',
		routing: {
			request: {
				qs: {
					excludes: '={{$parameter["ASNExclude"]}}',
				},
			},
		},
	},
];
