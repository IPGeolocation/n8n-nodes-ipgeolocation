# IP Geolocation n8n Integration

## Overview

The n8n+IPGeolocation integration makes it simple to use the full [**IPGeolocation.io**](https://ipgeolocation.io) APIs inside your n8n automation workflows. You do not need to write code or handle API requests because everything can be automated through clear and simple actions.

With this integration, you can quickly get helpful information about any IP address. This includes location details, network ownership, security risk information, user agent data, time zone details, and even basic astronomy information. You can use this data to improve your workflows, personalize user experiences, and make your automation more secure.

It allows you to automate retrieval of:

- Geolocation information for any IP address
- Threat intelligence and security risk details
- Network ownership and ASN information
- Time zone data and time conversion tools
- Astronomy information such as sunrise and sunset
- User agent details including browser, operating system, and device type

---

## IPGeolocation Node Installation Guide 
### Community Nodes (Recommended)
For users on n8n v0.187+, your instance owner can install this node from Community Nodes.

1. Go to **Settings > Community Nodes**.
2. Select **Install**.
3. Enter `n8n-nodes-ipgeolocation` in Enter npm package name.
4. Agree to the risks of using community nodes: select I understand the risks of installing unverified code from a public source.
5. Select **Install**.

### Manual Installation

It explains how to install and use the **official
`n8n-nodes-ipgeolocation` package**, developed and maintained by
**[IPGeolocation.io](https://ipgeolocation.io)**.\
Follow the steps below to integrate our IP Geolocation capabilities
directly into your n8n workflows.

#### Start n8n Once (to generate the .n8n folder)

``` bash
npx n8n
```

After it opens, close it. This ensures the `.n8n` directory is
generated.


#### Navigate to the n8n configuration directory

``` bash
cd ~/.n8n
```

#### Create a directory for custom nodes

``` bash
mkdir custom
cd custom
```

#### Initialize npm inside the custom folder

``` bash
npm init -y
```

#### Install the official IPGeolocation.io n8n node

``` bash
npm install n8n-nodes-ipgeolocation@1.0.0
```

This [npm package](https://www.npmjs.com/package/n8n-nodes-ipgeolocation) is the official IPGeolocation.io integration for n8n,
enabling powerful IP lookup, timezone, geolocation, and security data
directly inside your workflows.

#### Restart n8n

After the installation, restart your n8n instance using:

``` bash
npx n8n
```

n8n will automatically load all custom nodes located in the
`.n8n/custom` folder, including the **IPGeolocation.io** node.


#### You're Ready to Go!

You can now use the **IPGeolocation.io** node inside n8n to:

-   Retrieve IP Geolocation data
-   Detect timezone information
-   Perform IP Security checks
-   Enrich workflows with location-based intelligence

---

## API Key & Connection Setup

To use IPGeolocation.io with **n8n**, you need a valid **API Key**. Follow these steps carefully:

### Create or log in to your IPGeolocation.io account

- Go to [**IPGeolocation.io**](https://ipgeolocation.io/).
- If you don’t have an account, click [**Sign Up**](https://app.ipgeolocation.io/signup) and complete the registration.
- If you already have an account, click [**Sign in**](https://app.ipgeolocation.io/login) and enter your credentials.

### Obtain your API Key

- After logging in, go to your [**dashboard**](https://app.ipgeolocation.io/dashboard).
- Copy your **API Key** — you’ll need it to connect Make with IPGeolocation.io.

### Open n8n and create a scenario

- Go to [n8n instance](https://n8n.io/) and log in or sign up.
- Click + from your sidebar and create a new workflow from scratch.
- You will see a canvas where you can add nodes.

### Add an IPGeolocation node
- Make sure you have the **IPGeolocation.io** node installed.
- Click the **+** button to add a node.
- Search for **IPGeolocation** in the nodes search bar.

### Set up the connection

- Paste the **API Key** you copied earlier into the required field.
- Click **Save** to authenticate the connection.

![](https://static.ipgeolocation.io/web-assets/images/integrations/n8n/setup-connection.png)

### Test the connection

- n8n will attempt to connect using your API Key.
- If successful, the module will show a green checkmark and confirmation.

![](https://static.ipgeolocation.io/web-assets/images/integrations/n8n/successful-connection.png)

- If there’s an error, double-check your API Key and make sure it’s active and valid for the plan you’re using.

![](https://static.ipgeolocation.io/web-assets/images/integrations/n8n/error-connecting.png)

### Use your connection

- Once connected, this API Key is available for **all IPGeolocation modules** in your n8n workflows.
- You can now use it to perform actions like **Get IP Geolocation**, **Parse User Agent**, or **Bulk IP Geolocation**, depending on your API plan.

---

## Actions Availability across our Plans

We offer **four API plans**: **Developer**, **Standard**, **Security**, and **Advanced**.

The availability of actions depends on the plan you are subscribed to. The following table provides a detailed overview of which actions are included in each plan, helping you quickly identify the plan that suits your needs.

| **Action** | **Developer** | **Standard** | **Security** | **Advance** |
| --- | --- | --- | --- | --- |
| **Get IP Geolocation** | ✔ | ✔ | ✖ | ✔ |
| **Get Bulk IP Geolocation** | ✖ | ✔ | ✖ | ✔ |
| **Get IP Security** | ✖ | ✖ | ✔ | ✖ |
| **Get Bulk IP Security** | ✖ | ✖ | ✔ | ✖ |
| **Get ASN Info** | ✖ | ✖ | ✖ | ✔ |
| **Get Abuse Contact Info** | ✖ | ✖ | ✖ | ✔ |
| **Get Astronomy Info** | ✔ | ✔ | ✔ | ✔ |
| **Get Astronomy Timeseries Information** | ✔ | ✔ | ✔ | ✔ |
| **Get Timezone Info** | ✔ | ✔ | ✔ | ✔ |
| **Get Time Conversion** | ✔ | ✔ | ✔ | ✔ |
| **Get User Agent Info** | ✖ | ✔ | ✔ | ✔ |
| **Get Bulk User Agents Info** | ✖ | ✔ | ✔ | ✔ |

If you attempt to use **Security-related actions** (for example, **IP Security Lookup**) with an API key from the **Standard plan**, the request will **fail** because these actions are **exclusive to the Security plan**. The API will return an **error message** indicating unauthorized access.

![](https://static.ipgeolocation.io/web-assets/images/integrations/n8n/unauthorized-operation.png)

For full pricing details and to choose your plan, see the [pricing page](https://ipgeolocation.io/pricing.html).

---

## Modules

Below is a structured reference of all modules in this integration.

### **Geolocation**

#### **Get IP Geolocation**

Retrieves full geolocation data of a single IPv4/IPv6.

- **Input:** IP Address
- **Outputs:** country_name, city, latitude, longitude and [many more](https://ipgeolocation.io/ip-location-api.html#2-location-json-object-reference)

#### **Get Bulk IP Geolocation**

Retrieves geolocation for up to 50,000 IPs per request.

- **Input:** Array of IPs
- **Outputs:** Collection of geolocation objects

![](https://static.ipgeolocation.io/web-assets/images/integrations/n8n/ip-geolocation.png)

### **Security**

#### **IP Security Lookup**

Security insights such as proxy, VPN, TOR, threat score, cloud and proxy providers.

- **Input:** IP Address
- **Outputs:** security.is_proxy, security.is_vpn, security.threat_score, security.is_cloud_provider and [more](https://ipgeolocation.io/ip-security-api.html#2-security-json-object-reference)

#### **Bulk IP Security Lookup**

Security assessment for multiple IPs.

- **Input:** Array of IPs
- **Outputs:** Collection of [security data](https://ipgeolocation.io/ip-security-api.html#2-security-json-object-reference)

![](https://static.ipgeolocation.io/web-assets/images/integrations/n8n/ip-security.png)

### **Network Intelligence**

#### **Lookup ASN**

Provides a simple way to retrieve accurate information about an Autonomous System Number (ASN) and its associated IPv4 and IPv6 address ranges.

- **Input:** IP or ASN number
- **Outputs:** asn.as_number, asn.organization and [more](https://ipgeolocation.io/asn-api.html#reference-to-asn-api-response)

![](https://static.ipgeolocation.io/web-assets/images/integrations/n8n/asn.png)

#### **Lookup Abuse Contact Information**

Includes details such as the role, handle, organization name, kind (e.g., group or individual), and postal address. This information helps identify the entity responsible for handling abuse reports.

- **Input:** IP Address
- **Outputs:** abuse.emails, abuse.handle and [more](https://ipgeolocation.io/ip-abuse-contact-api.html#reference-to-abuse-contact-api-response)

![](https://static.ipgeolocation.io/web-assets/images/integrations/n8n/abuse.png)

### **Time Services**

Free **Timezone API** and **Time conversion API** provides date and time related information such as current time, date in various formats, week, month, year, time in unix timestamp, UTC/GMT offset and day light saving time from timezone name, any IPv4 or IPv6 address or geolocation coordinates, IATA code, ICAO code, or UN/LOCODE.

#### **Get Timezone Info**

It can be consumed with the following input variations:

- For a Time Zone Name
- For any Address (preferrably, city address)
- For Location Coordinates (latitude & longitude)
- For any IP address
- For any IATA code
- For any ICAO code
- For any UN/LO Code
- **Outputs:** time_zone.name, time_zone.current_time, time_zone.date_time_wti and [more](https://ipgeolocation.io/timezone-api.html#reference-to-time-zone-api-response)

![](https://static.ipgeolocation.io/web-assets/images/integrations/n8n/timezone.png)

#### **Time Conversion**

Converts a time from one of following options

- Convert Time using Time Zone Names
- Convert Time using Location
- Convert Time using Coordinates
- Convert Time using IATA codes
- Convert Time using ICAO codes
- Convert Time using UN/LOCODEs

**Output:** Converted [date/time](https://ipgeolocation.io/timezone-api.html#reference-to-time-conversion-api-response)

![](https://static.ipgeolocation.io/web-assets/images/integrations/n8n/time-conversion.png)

### **Astronomy**

Provides timings for sunrise, sunset, moonrise, moonset, sun azimuth, moon azimuth, sun altitude, moon altitude, sun distance from the earth and moon distance from the earth.

#### **Get Astronomy Details**

- **Outputs:** astronomy.sunrise, astronomy.sunset, astronomy.moon_phase and [many more.](https://ipgeolocation.io/astronomy-api.html#reference-to-astronomy-api-response)

![](https://static.ipgeolocation.io/web-assets/images/integrations/n8n/astronomy.png)

#### **Astronomy Time Series Lookup**

- **Outputs:** Daily astronomy data for a defined date range.

![](https://static.ipgeolocation.io/web-assets/images/integrations/n8n/astronomy-timeseries.png)

### **User-Agent Parsing**

Provides detailed client system information, allowing for the detection of bots, crawlers, and potential attackers.

#### **Parse User Agent String**

- **Input:** User agent string
- **Outputs:** provides name, device and operating sysem [information](https://ipgeolocation.io/user-agent-api.html#reference-to-user-agent-api-response).

![](https://static.ipgeolocation.io/web-assets/images/integrations/n8n/user-agent.png)

#### **Parse Bulk User Agent Strings**

- **Input:** Array of User agent strings
- **Outputs:** Collection of parsed user agent objects

![](https://static.ipgeolocation.io/web-assets/images/integrations/n8n/bulk-user-agent.png)

---

## Use Cases

Some of the use cases are provided as following.

### **E‑commerce Fraud & Network Vetting**

**Modules:** IP Security Lookup, Lookup Abuse, Lookup ASN

**Scenario:** Validate order IPs before processing.

- Trigger: Shopify/WooCommerce detects new order.
- Step 1: Security Lookup: Check proxy/VPN.
- Step 2: ASN Lookup:  Find ISP & organization.
- Filter: Only proceed if *not* proxy AND not cloud provider.
- If high-risk: Tag the order “Fraud Review”

---

### **Personalized Content & Time‑Aware Scheduling**

**Modules:** Get IP Geolocation, Get Timezone Info, Time Conversion

**Scenario:** Send newsletter at **10 AM local time**.

- Step 1: Geolocation: Get currency + country.
- Step 2: Timezone Info: Get exact timezone.
- Step 3: Time Conversion: Convert 10 AM UTC to local.
- Step 4: Email tool: Send at converted time.

---

### **Bulk Data Enrichment & Reporting**

**Modules:** Bulk Geolocation, Bulk Security Lookup, Array Aggregator, Iterator

**Scenario:** Enrich 5,000+ IPs with location + threat scoring.

- Fetch rows from Google Sheets.
- Aggregate IPs into an array.
- Bulk lookup for location and security.
- Iterate results.
- Update rows with new fields: city, country_name, threat_score.

---

### **Astronomy‑Based IoT Scheduling**

**Modules:** Astronomy Details, Astronomy Time Series

**Scenario:** Automate IoT actions based on sunrise, sunset, moon phase.

- Daily schedule at midnight.
- Astronomy Details: Get sunrise & moon phase.
- Save results in Data Store/Airtable.
- IoT app triggers actions after sunrise.
