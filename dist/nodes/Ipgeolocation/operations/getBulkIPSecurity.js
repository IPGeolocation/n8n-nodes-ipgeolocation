"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBulkIPSecurity = void 0;
exports.getBulkIPSecurity = [
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
];
//# sourceMappingURL=getBulkIPSecurity.js.map