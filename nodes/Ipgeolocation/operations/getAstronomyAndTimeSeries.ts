import { INodeProperties } from "n8n-workflow";

export const getAstronomyAndTimeSeries: INodeProperties[] = [
    // ---------------------------
			// Query Astronomy By dropdown
			// ---------------------------
			{
				displayName: 'Query Astronomy By',
				name: 'astronomyQueryBy',
				type: 'options',
				options: [
					{ name: 'IP Address', value: 'ipAstronomy' },
					{ name: 'Coordinates', value: 'coords' },
					{ name: 'Location', value: 'location' },
					{ name: 'Timezone', value: 'timezone' },
				],
				default: 'location',
				displayOptions: {
					show: {
						operation: ['getAstronomy', 'getAstronomyTimeseries'],
					},
				},
				description: 'Select how you want to query Astronomy information',
			},

			// ---------------------------
			// IP Address input
			// ---------------------------
			{
				displayName: 'IP Address',
				name: 'ipAstronomy',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						operation: ['getAstronomy', 'getAstronomyTimeseries'],
						astronomyQueryBy: ['ipAstronomy'],
					},
				},
				description: 'The IP address to query Astronomy information for',
				hint: 'Enter a valid IPv4 or IPv6 address',
				placeholder: 'e.g., 8.8.8.8',
				routing: {
					request: {
						qs: { ip: '={{$parameter["ipAstronomy"]}}' },
					},
				},
			},

			// ---------------------------
			// Coordinates inputs
			// ---------------------------
			{
				displayName: 'Latitude',
				name: 'latitudeAstronomy',
				type: 'number',
				default: 0,
				hint: 'Decimal degrees, e.g., 37.7749',
				required: true,
				displayOptions: {
					show: {
						operation: ['getAstronomy', 'getAstronomyTimeseries'],
						astronomyQueryBy: ['coords'],
					},
				},
				description: 'Latitude in decimal degrees for the target location',
				routing: {
					request: {
						qs: { lat: '={{$parameter["latitudeAstronomy"]}}' },
					},
				},
			},

			{
				displayName: 'Longitude',
				name: 'longitudeAstronomy',
				type: 'number',
				default: 0,
				hint: 'Decimal degrees, e.g., -122.4194',
				required: true,
				displayOptions: {
					show: {
						operation: ['getAstronomy', 'getAstronomyTimeseries'],
						astronomyQueryBy: ['coords'],
					},
				},
				description: 'Longitude in decimal degrees for the target location',
				routing: {
					request: {
						qs: { long: '={{$parameter["longitudeAstronomy"]}}' },
					},
				},
			},

			// ---------------------------
			// Location input
			// ---------------------------
			{
				displayName: 'Location',
				name: 'locationAstronomy',
				type: 'string',
				default: '',
				required: true,
				hint: 'City, region, or country, e.g., New York, US',
				displayOptions: {
					show: {
						operation: ['getAstronomy', 'getAstronomyTimeseries'],
						astronomyQueryBy: ['location'],
					},
				},
				description: 'The location (city, region, country) to query Astronomy information',
				routing: {
					request: {
						qs: { location: '={{$parameter["locationAstronomy"]}}' },
					},
				},
			},

			// ---------------------------
			// Timezone input
			// ---------------------------
			{
				displayName: 'Timezone',
				name: 'timezoneAstronomy',
				type: 'string',
				default: '',
				required: true,
				hint: 'Timezone, e.g., America/New_York',
				displayOptions: {
					show: {
						operation: ['getAstronomy', 'getAstronomyTimeseries'],
						astronomyQueryBy: ['timezone'],
					},
				},
				description: 'The timezone to query Astronomy information',
				routing: {
					request: {
						qs: { time_zone: '={{$parameter["timezoneAstronomy"]}}' },
					},
				},
			},

			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'YYYY-MM-DD',
				hint: 'Example: 2025-01-15',
				displayOptions: {
					show: {
						operation: ['getAstronomyTimeseries'],
					},
				},
				description: 'Start date for the query in YYYY-MM-DD format',
				routing: {
					request: {
						qs: {
							dateStart: '={{$parameter["startDate"]}}',
						},
					},
				},
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'YYYY-MM-DD',
				displayOptions: {
					show: {
						operation: ['getAstronomyTimeseries'],
					},
				},
				hint: 'Example: 2025-02-10 — must be after Start Date and within 90 days of it',
				description:
					'End date in YYYY-MM-DD format. Must be greater than the Start Date and must not exceed 90 days after it.',
				routing: {
					request: {
						qs: {
							dateEnd: '={{$parameter["endDate"]}}',
						},
					},
				},
			}
]