"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpgeolocationApi = void 0;
class IpgeolocationApi {
    constructor() {
        this.name = 'ipgeolocationApi';
        this.displayName = 'IPGeolocation API';
        this.icon = { light: 'file:../nodes/Ipgeolocation/ipgeolocation-light.svg', dark: 'file:../nodes/Ipgeolocation/ipgeolocation-dark.svg' };
        this.documentationUrl = 'https://github.com/IPGeolocation/n8n-nodes-ipgeolocation?tab=readme-ov-file#api-key--connection-setup';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                required: true,
                default: '',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Authorization': 'fcrst61jc444v0i3go2pivfpgaaeombv'
                },
                qs: {
                    apiKey: '={{$credentials.apiKey}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: 'https://billing.ipgeolocation.io',
                url: '/subscription/isApiKeyValid',
            },
        };
    }
}
exports.IpgeolocationApi = IpgeolocationApi;
//# sourceMappingURL=IpgeolocationApi.credentials.js.map