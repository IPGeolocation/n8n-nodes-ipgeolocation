import { INodeProperties } from "n8n-workflow";

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
]