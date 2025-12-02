import { INodeProperties } from "n8n-workflow";

export const getUserAgent: INodeProperties[] = [
    {
        displayName: 'User Agent String',
        name: 'uaString',
        type: 'string',
        required: true,
        default: '',
        placeholder: 'e.g., Mozilla/5.0 (Windows NT 10.0; Win64; x64)...',
        hint: 'Paste the full User-Agent header string here',
        displayOptions: {
            show: {
                operation: ['getUserAgent'],
            },
        },
        description: 'The User-Agent string to analyze',
        routing: {
            request: {
                body: {
                    uaString: '={{$parameter["uaString"]}}',
                },
            },
        },
    }
]