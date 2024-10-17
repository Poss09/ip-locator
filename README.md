# IP Locator: Location-Based Recommendation App

## Overview

IP Locator is a React-based web application that provides users with their geolocation data and location-based recommendations. The app integrates multiple APIs to deliver a comprehensive user experience, combining IP geolocation, mapping services, and place recommendations.

## API Integrations

### 1. Custom IP Geolocation API

- **Endpoint**: `http://localhost:5000/api/ip`
- **Purpose**: Retrieves the user's IP address and basic geolocation data
- **Data Returned**: IP address, city, country, latitude, longitude, region

### 2. ipinfo.io API

- **Endpoint**: `https://ipinfo.io/{ip}/json`
- **Purpose**: Enhances geolocation data with additional details
- **Data Returned**: Timezone, postal code, organization

### 3. OpenStreetMap API

- **Purpose**: Provides mapping functionality
- **Integration**: Utilized through React Leaflet components
- **Features**: Interactive map display based on user's latitude and longitude

### 4. Google Places API

- **Endpoint**: `https://maps.googleapis.com/maps/api/place/nearbysearch/json`
- **Purpose**: Fetches nearby place recommendations based on user's location
- **Data Returned**: Place names, types, ratings, and photo references

### 5. Google Places Photo API

- **Endpoint**: `https://maps.googleapis.com/maps/api/place/photo`
- **Purpose**: Retrieves images for recommended places
- **Data Returned**: Image data for display

## Implementation Details

### Fetching IP and Geolocation Data

1. The app first calls the custom backend API to get the user's IP address.
2. It then uses the IP address to fetch detailed geolocation data from ipinfo.io.

```javascript
const fetchIPData = async () => {
  const response = await fetch('http://localhost:5000/api/ip');
  const data = await response.json();
  return data.ip;
};

 const ipinfoUrl = `https://ipinfo.io/${publicIp}/json?token=${process.env.IPINFO_API_KEY}`;
    console.log("IP Info URL: ", ipinfoUrl);

    const response = await axios.get(ipinfoUrl);
    const data = response.data;
```

### Displaying Map

The app uses React Leaflet to render an interactive map based on the user's coordinates:

```javascript
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

<MapContainer center={[latitude, longitude]} zoom={13}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  <Marker position={[latitude, longitude]} />
</MapContainer>
```

### Fetching Place Recommendations

Once the user's location is determined, the app fetches nearby place recommendations:

```javascript
const fetchNearbyPlaces = async (latitude, longitude) => {
  const response = await fetch(`ttps://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`);
  return await response.json();
};
```

### Retrieving Place Images

For each recommended place, the app fetches an image using the Google Places Photo API:
```javascript
const enrichedPlaces = places.map((place) => {
      if (place.photos && place.photos.length > 0) {
        const photoReference = place.photos[0].photo_reference;
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
        return { ...place, photoUrl }; // Add the photo URL to the place data
      }
      return place; // Return place without photo URL if no photos available
    });
```

## Setup and Configuration

1. Clone the repository:
   ```
   git clone https://github.com/Poss09/ip-locator.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your API keys:
   ```
   REACT_APP_API_URL
   REACT_APP_IPINFO_API_KEY=your_ipinfo_token
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open `http://localhost:3000` in your browser.

## Note on API Usage

Ensure you comply with the usage terms and conditions of each API. Monitor your API usage to avoid exceeding rate limits or incurring unexpected costs, especially for the Google Places API.
