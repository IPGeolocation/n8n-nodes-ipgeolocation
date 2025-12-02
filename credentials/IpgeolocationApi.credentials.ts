import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class IpgeolocationApi implements ICredentialType {
	name = 'ipgeolocationApi';

	displayName = 'IPGeolocation API';
	icon: Icon = { light: 'file:../nodes/Ipgeolocation/ipgeolocation-light.png', dark: 'file:../nodes/Ipgeolocation/ipgeolocation-dark.png' };
	// Link to your community node's README
	documentationUrl = 'https://github.com/IPGeolocation/n8n-nodes-ipgeolocation?tab=readme-ov-file#api-key--connection-setup';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
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

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://billing.ipgeolocation.io',
			url: '/subscription/isApiKeyValid',
		},
	};
}
