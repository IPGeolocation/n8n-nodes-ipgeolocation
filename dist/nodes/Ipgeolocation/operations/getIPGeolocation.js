"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIPGeolocation = void 0;
exports.getIPGeolocation = [
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
];
//# sourceMappingURL=getIPGeolocation.js.map