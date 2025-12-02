"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBulkUserAgents = void 0;
exports.getBulkUserAgents = [
    {
        displayName: 'User Agent Strings',
        name: 'uaStrings',
        type: 'fixedCollection',
        typeOptions: {
            multipleValues: true,
        },
        placeholder: 'Add User-Agent',
        default: {},
        displayOptions: {
            show: {
                operation: ['getBulkUserAgent'],
            },
        },
        options: [
            {
                name: 'values',
                displayName: 'User Agent',
                values: [
                    {
                        displayName: 'User Agent String',
                        name: 'uaString',
                        type: 'string',
                        default: '',
                        placeholder: 'e.g., Mozilla/5.0 (Windows NT 10.0; Win64; x64)...',
                        hint: 'Enter a User-Agent string. Add more entries to send multiple.',
                        description: 'A single User-Agent string',
                    },
                ],
            },
        ],
        routing: {
            request: {
                body: {
                    uaStrings: '={{ $parameter["uaStrings"].values.map(v => v.uaString) }}',
                },
            },
        },
    },
];
//# sourceMappingURL=getBulkUserAgents.js.map