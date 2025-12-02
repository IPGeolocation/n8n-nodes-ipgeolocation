"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBulkIPGeolocation = void 0;
exports.getBulkIPGeolocation = [
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
];
//# sourceMappingURL=getBulkIPGeolocation.js.map