"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbuseInfo = void 0;
exports.getAbuseInfo = [
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
    }
];
//# sourceMappingURL=getAbuseInfo.js.map