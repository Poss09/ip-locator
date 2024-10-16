import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayerGroup,
  Circle,
} from 'react-leaflet'; // Importing components from react-leaflet for map rendering
import './Map.scss'; // Importing the stylesheet for styling the Map component

// The Map component displays a map with markers for IP and geolocation positions
const Map = ({ IpLat, IpLon, geoLat, geoLon }) => {
  let position = []; // Array to hold the calculated position for the map center
  const fillBlueOptions = { fillColor: 'red', color: 'red' }; // Options for the circle's appearance

  // Calculate the average position if both geolocation coordinates are provided
  if (geoLat && geoLon) {
    const averageLat = (IpLat + geoLat) / 2; // Average latitude
    const averageLon = (IpLon + geoLon) / 2; // Average longitude
    position = [averageLat, averageLon]; // Set position to the average
  } else {
    position = [IpLat, IpLon]; // Default to IP coordinates if geolocation isn't available
  }

  return (
    <div id="map"> {/* Container for the map */}
      <MapContainer center={position} zoom={7} scrollWheelZoom={true}> {/* Map container with initial position and zoom level */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' // Attribution for the tile layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // URL template for the tile layer
        />
        <Marker position={[IpLat, IpLon]}> {/* Marker for the IP position */}
          <Popup>Your current IP position.</Popup> {/* Popup displaying the IP position message */}
        </Marker>
        {/* Render geolocation circle and marker if geolocation coordinates are available */}
        {geoLat !== '' && geoLon !== '' && (
          <LayerGroup> {/* Grouping layers for geolocation */}
            <Circle
              center={[geoLat, geoLon]} // Center of the circle at the geolocation coordinates
              pathOptions={fillBlueOptions} // Styling options for the circle
              radius={6000} // Radius of the circle in meters
            />
            <Marker position={[geoLat, geoLon]} style={{ color: 'red' }}> {/* Marker for the geolocation position */}
              <Popup>Your current geolocation position.</Popup> {/* Popup displaying the geolocation position message */}
            </Marker>
          </LayerGroup>
        )}
      </MapContainer>
    </div>
  );
};

export default Map; // Exporting the Map component for use in other parts of the application
