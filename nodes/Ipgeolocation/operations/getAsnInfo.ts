import { INodeProperties } from "n8n-workflow";

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
]