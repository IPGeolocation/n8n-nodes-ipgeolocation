"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ipgeolocation = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const operations_1 = require("./operations");
const getAsnInfo_1 = require("./operations/getAsnInfo");
const getBulkUserAgents_1 = require("./operations/getBulkUserAgents");
const getAstronomyAndTimeSeries_1 = require("./operations/getAstronomyAndTimeSeries");
const getTimezoneAndConversion_1 = require("./operations/getTimezoneAndConversion");
const getUserAgent_1 = require("./operations/getUserAgent");
const getAbuseInfo_1 = require("./operations/getAbuseInfo");
const getIPGeolocation_1 = require("./operations/getIPGeolocation");
const getIPSecurity_1 = require("./operations/getIPSecurity");
const getBulkIPGeolocation_1 = require("./operations/getBulkIPGeolocation");
const getBulkIPSecurity_1 = require("./operations/getBulkIPSecurity");
class Ipgeolocation {
    constructor() {
        this.description = {
            displayName: 'IPGeolocation',
            name: 'ipgeolocation',
            icon: { light: 'file:ipgeolocation-light.svg', dark: 'file:ipgeolocation-dark.svg' },
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"]}}',
            description: 'Integrate ipgeolocation.io with n8n to automate IP lookup, geolocation, timezone data, and security checks for powerful workflow enrichment.',
            defaults: {
                name: 'ipgeolocation',
            },
            usableAsTool: true,
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            credentials: [{ name: 'ipgeolocationApi', required: true }],
            requestDefaults: {
                baseURL: 'https://api.ipgeolocation.io',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
            properties: [
                ...operations_1.operations,
                ...getIPGeolocation_1.getIPGeolocation,
                ...getBulkIPGeolocation_1.getBulkIPGeolocation,
                ...getBulkIPSecurity_1.getBulkIPSecurity,
                ...getIPSecurity_1.getIPSecurity,
                ...getAbuseInfo_1.getAbuseInfo,
                ...getAsnInfo_1.getAsnInfo,
                ...getAstronomyAndTimeSeries_1.getAstronomyAndTimeSeries,
                ...getTimezoneAndConversion_1.getTimezoneAndConversion,
                ...getUserAgent_1.getUserAgent,
                ...getBulkUserAgents_1.getBulkUserAgents
            ],
        };
    }
}
exports.Ipgeolocation = Ipgeolocation;
//# sourceMappingURL=Ipgeolocation.node.js.map