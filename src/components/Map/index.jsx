import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayerGroup,
  Circle,
} from 'react-leaflet';
import './Map.scss';

const Map = ({ IpLat, IpLon, geoLat, geoLon, recommendations }) => {
  
  let position = [];
  const fillBlueOptions = { fillColor: 'red', color: 'red' };

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

        {/* Marker for the current IP position */}
        <Marker position={[IpLat, IpLon]} icon={new L.Icon({ iconUrl: 'path/to/highlighted-marker-icon.png', iconSize: [25, 41] })}>
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
