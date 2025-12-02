"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operations = void 0;
exports.operations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
            {
                name: 'Get Abuse Contact Info',
                value: 'getAbuseInfo',
                description: 'Retrieves abuse contact and reporting information for an IP address, including organization, network, and abuse email details',
                action: 'Get abuse info',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/v2/abuse',
                    },
                },
            },
            {
                name: 'Get ASN Info',
                value: 'getAsnInfo',
                description: 'Retrieves Autonomous System Number (ASN) details for an IP address or ASN, including organization, country, and network information',
                action: 'Get asn info',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/v2/asn',
                    },
                },
            },
            {
                name: 'Get Astronomy Info',
                value: 'getAstronomy',
                description: 'The Astronomy API provides sun, moon data using IP, latitude, longitude, timezone or Location',
                action: 'Get astronomy info',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/v2/astronomy',
                    },
                },
            },
            {
                name: 'Get Astronomy Timeseries Information',
                value: 'getAstronomyTimeseries',
                description: 'Look up astronomy details for any location by providing a starting and ending date for the time series',
                action: 'Get timezone info',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/v2/astronomy/timeSeries',
                    },
                },
            },
            {
                name: 'Get Bulk IP Geolocation',
                value: 'getBulkIpGeolocation',
                description: 'Retrieves geolocation information (country, city, coordinates, etc.) for multiple IP addresses at once',
                action: 'Get bulk ip geolocation',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/v2/ipgeo-bulk',
                    },
                },
            },
            {
                name: 'Get Bulk IP Security',
                value: 'getBulkIPSecurity',
                description: 'Retrieves security information for multiple IP addresses at once, including proxy, VPN, TOR, and threat intelligence details',
                action: 'Get bulk ip security',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/v2/security-bulk',
                    },
                },
            },
            {
                name: 'Get Bulk User Agents Info',
                value: 'getBulkUserAgent',
                description: 'Retrieves detailed client system and browser information for multiple user agents at once(max 50,000), enabling detection of bots, crawlers, and potential attackers',
                action: 'Get bulk user agent info',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/v2/user-agent-bulk',
                    },
                },
            },
            {
                name: 'Get IP Geolocation',
                value: 'getIpInfo',
                description: 'Retrieves detailed geolocation information (country, city, coordinates, etc.) for a specified IP address',
                action: 'Get ip geolocation',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/v2/ipgeo',
                    },
                },
            },
            {
                name: 'Get IP Security',
                value: 'getIpSecurityInfo',
                description: 'Retrieves security information about an IP address, including proxy, VPN, TOR, and threat intelligence details',
                action: 'Get ip security info',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/v2/security',
                    },
                },
            },
            {
                name: 'Get Time Conversion',
                value: 'getTimeConversion',
                description: 'Calculates precise time differences in hours and minutes between two locations using time zones, coordinates, or cities',
                action: 'Get timezone info',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/v2/timezone/convert',
                    },
                },
            },
            {
                name: 'Get Timezone Info',
                value: 'getTimezone',
                description: 'Provides current date, time, UTC offset, and daylight saving info for any timezone, IP address, or geolocation coordinates via timezone API',
                action: 'Get timezone info',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/v2/timezone',
                    },
                },
            },
            {
                name: 'Get User Agent Info',
                value: 'getUserAgent',
                description: 'Provides detailed client system and browser information for detecting bots, crawlers, and potential attackers',
                action: 'Get user agent info',
                routing: {
                    request: {
                        method: 'POST',
                        url: '/v2/user-agent',
                    },
                },
            },
        ],
        default: 'getIpInfo',
    }
];
//# sourceMappingURL=index.js.map