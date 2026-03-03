# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] — Targeting IPGeolocation.io v3 APIs

### Changed
- Upgraded all node actions to use **IPGeolocation.io v3 APIs**.
- Updated response output structure for:
  - Get IP Geolocation
  - Get Bulk IP Geolocation
- Removed deprecated response fields:
  - `handle` and `role` fields removed from **Get Abuse Contact Info**.
- Updated Timezone API response:
  - Replaced `date_time_unix` with `current_time_unix`
  - Added new field `current_time`
- Updated README documentation to reflect all v3 API changes.

### Added
- Added `fields` and `excludes` parameters to reduce payload size and return only required data in:
  - Get IP Geolocation
  - Get Bulk IP Geolocation
  - Get IP Security
  - Get Bulk IP Security
  - Get Abuse Contact Info
  - Get ASN Info
- Added `includes` parameter to enrich API responses with additional objects in:
  - Get IP Geolocation
  - Get Bulk IP Geolocation
  - Get ASN Info

---

## [1.0.0] — Initial Release

### Added
- First official release of **n8n-nodes-ipgeolocation** with full integration of **IPGeolocation.io API v2**.
- Supported actions:
  - IP Geolocation Lookup — Retrieve detailed geolocation data for a single IP address.
  - Bulk IP Geolocation — Process large batches of IPs (up to 50,000 per request).
  - IP Security Lookup — Detect proxy, VPN, TOR, cloud provider usage, and threat intelligence.
  - Bulk IP Security Lookup — Perform security checks on multiple IP addresses.
  - ASN / Network Lookup — Retrieve ASN, ISP, organization, and network range details.
  - Abuse Contact API — Get abuse contact information for an IP address.
  - Timezone API — Retrieve time, timezone, daylight-saving, and localization data.
  - Time Conversion API — Convert time between formats, locations, or timezones.
  - Astronomy API — Access sunrise, sunset, moonrise, moonset, and moon-phase details.
  - User-Agent Parser API — Parse user-agent strings into structured device, OS, and browser metadata.