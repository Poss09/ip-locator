import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayerGroup,
  Circle,
} from 'react-leaflet';
import L from 'leaflet'; // Import L from leaflet
import './Map.scss';

// Example path to your custom marker icon
import customIconUrl from '../../assets/leaf-green.png';

const Map = ({ IpLat, IpLon, geoLat, geoLon, recommendations }) => {
  
  let position = [];
  const fillBlueOptions = { fillColor: 'red', color: 'red' };

  // Create a custom icon for highlighting the IP marker
  const customIcon = new L.Icon({
    iconUrl: customIconUrl, // Provide the path to your custom icon image
    iconSize: [45, 61], // Adjust the size as needed
    iconAnchor: [12, 41], // Anchor the icon to the bottom center (so it points correctly on the map)
    popupAnchor: [1, -34], // Adjust popup position relative to the icon
  });

  // Calculate the position to center the map
  if (geoLat && geoLon) {
    const averageLat = (IpLat + geoLat) / 2;
    const averageLon = (IpLon + geoLon) / 2;
    position = [averageLat, averageLon];
  } else {
    position = [IpLat, IpLon];
  }

  return (
    <div id="map">
      <MapContainer center={position} zoom={12} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Circle at the IP location */}
        <Circle
          center={[IpLat, IpLon]}
          pathOptions={fillBlueOptions}
          radius={6000}
        />

        {/* Marker for the current IP position with custom icon */}
        <Marker position={[IpLat, IpLon]} icon={customIcon}>
          <Popup>Your current IP position.</Popup>
        </Marker>

        {/* Marker for the geolocation position if available */}
        {geoLat && geoLon && (
          <LayerGroup>
            <Marker position={[geoLat, geoLon]}>
              <Popup>Your current geolocation position.</Popup>
            </Marker>
          </LayerGroup>
        )}
        
        {/* Display recommendations as markers */}
        {recommendations.map((rec, index) => (
          <Marker key={index} position={[rec.lat, rec.lng]}>
            <Popup>
              <strong>{rec.name}</strong><br />
              {rec.vicinity} {/* Adjust this to display relevant recommendation information */}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
