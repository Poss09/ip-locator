import { useState, useEffect } from 'react'; // Importing React hooks for state and side effects
import Header from './components/Header/'; // Importing the Header component
import Datas from './components/Datas/'; // Importing the Datas component to display information
import Map from './components/Map/'; // Importing the Map component to display geolocation
import './_shared.scss'; // Importing shared styles

function App() {
  // State variables to manage IP data and geolocation information
  const [IpDatas, setIpDatas] = useState({}); // Stores IP-related data
  const [isLoadedIp, setIsLoadedIp] = useState(false); // Tracks if IP data has been loaded
  const [isLoadedIpDatas, setIsLoadedIpDatas] = useState(false); // Tracks if additional IP data has been loaded
  const [geolocationCity, setGeolocationCity] = useState(''); // Stores the city from geolocation
  const [geoLat, setGeoLat] = useState(null); // Stores geolocation latitude
  const [geoLon, setGeoLon] = useState(null); // Stores geolocation longitude
  const [isMapReady, setIsMapReady] = useState(false); // Tracks if the map is ready to be displayed

  // Effect to get the user's geolocation when the component mounts
  useEffect(() => {
    console.log('App mounted'); // Log when the app is mounted
    if ('geolocation' in navigator) { // Check if geolocation is supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Geolocation success:', position.coords); // Log successful geolocation
          setGeoLat(position.coords.latitude); // Set latitude from geolocation
          setGeoLon(position.coords.longitude); // Set longitude from geolocation
        },
        (error) => {
          console.error('Error getting geolocation: ', error.message); // Log error if geolocation fails
        }
      );
    } else {
      console.log('Geolocation not supported'); // Log if geolocation is not supported
    }
  }, []);

  // Function to fetch IP data from the API
  const fetchIp = async () => {
    const url = process.env.REACT_APP_API_URL; // Get the API URL from environment variables
    console.log('Fetching IP data from:', url); // Log the API URL being fetched
    try {
      const response = await fetch(url); // Fetch IP data
      if (!response.ok) { // Check if the response is successful
        throw new Error(`HTTP error! status: ${response.status}`); // Throw an error if not successful
      }
      const data = await response.json(); // Parse the JSON response
      console.log('IP data received:', data); // Log the received IP data
      
      // Parse and store relevant IP data
      const parsedData = { 
        ip: data.ip, 
        latitude: parseFloat(data.latitude), 
        longitude: parseFloat(data.longitude), 
        city: data.city,
        country: data.country,
        region: data.region,
      };
      console.log('Parsed IP data:', parsedData); // Log parsed IP data
      
      setIpDatas(parsedData); // Set the parsed IP data to state
      setIsLoadedIp(true); // Mark IP data as loaded
      setIsLoadedIpDatas(true); // Mark additional IP data as loaded
      setIsMapReady(true); // Set the map to be ready for display
    } catch (error) {
      console.error('Error fetching IP data: ', error.message); // Log error if fetching fails
    }
  };

  // Function to fetch city data based on geolocation coordinates
  const fetchCityFromGeolocation = async (lat, lon) => {
    console.log(`Fetching city data for coordinates: ${lat}, ${lon}`); // Log the coordinates being fetched
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
      ); // Fetch city data based on lat/lon
      if (!response.ok) { // Check if the response is successful
        throw new Error(`HTTP error! status: ${response.status}`); // Throw an error if not successful
      }
      const data = await response.json(); // Parse the JSON response
      console.log('City data received:', data); // Log the received city data
      // Set the geolocation city based on the received data
      setGeolocationCity(data.address.village || data.address.city || ''); 
    } catch (error) {
      console.error('Error fetching city data: ', error.message); // Log error if fetching fails
    }
  };

  // Effect to fetch IP data when the component mounts
  useEffect(() => {
    console.log('Fetching IP data'); // Log when fetching IP data
    fetchIp(); // Call the fetchIp function
  }, []);

  // Effect to fetch city data when geolocation coordinates are updated
  useEffect(() => {
    console.log('Geolocation updated:', { geoLat, geoLon }); // Log updated geolocation
    if (geoLat !== null && geoLon !== null) { // Check if both coordinates are available
      fetchCityFromGeolocation(geoLat, geoLon); // Fetch city data based on geolocation
    }
  }, [geoLat, geoLon]); // Dependencies: geoLat, geoLon

  // Function to get valid coordinates for the map
  const getValidCoordinates = () => {
    console.log('Getting valid coordinates'); // Log when getting valid coordinates
    console.log('IP coordinates:', { lat: IpDatas.latitude, lon: IpDatas.longitude }); // Log IP coordinates
    console.log('Geolocation coordinates:', { lat: geoLat, lon: geoLon }); // Log geolocation coordinates
    
    // Check if IP coordinates are valid
    if (isFinite(IpDatas.latitude) && isFinite(IpDatas.longitude)) {
      console.log('Using IP coordinates'); // Log when using IP coordinates
      return { lat: IpDatas.latitude, lon: IpDatas.longitude }; // Return IP coordinates
    }
    // Check if geolocation coordinates are valid
    if (isFinite(geoLat) && isFinite(geoLon)) {
      console.log('Using geolocation coordinates'); // Log when using geolocation coordinates
      return { lat: geoLat, lon: geoLon }; // Return geolocation coordinates
    }
    console.log('Using default coordinates'); // Log when using default coordinates
    return { lat: 0, lon: 0 }; // Return default coordinates
  };

  // Get the final valid coordinates for the map
  const { lat, lon } = getValidCoordinates();
  console.log('Final coordinates for map:', { lat, lon }); // Log the final coordinates

  return (
    <div className="main"> {/* Main container for the app */}
      <Header /> {/* Render the Header component */}
      <Datas
        ip={IpDatas.ip} // Pass IP address
        isLoadedIp={isLoadedIp} // Pass IP loaded state
        isLoadedIpDatas={isLoadedIpDatas} // Pass additional IP data loaded state
        ipCity={IpDatas.city} // Pass city from IP data
        geolocationCity={geolocationCity} // Pass city from geolocation
        ipCountry={IpDatas.country} // Pass country from IP data
        ipLat={IpDatas.latitude} // Pass latitude from IP data
        ipLon={IpDatas.longitude} // Pass longitude from IP data
        geoLat={geoLat} // Pass geolocation latitude
        geoLon={geoLon} // Pass geolocation longitude
        ipRegion={IpDatas.region} // Pass region from IP data
      />
      {isMapReady ? ( // Check if the map is ready to be displayed
        <Map IpLat={lat} IpLon={lon} geoLat={geoLat} geoLon={geoLon} /> // Render the Map component with coordinates
      ) : (
        <div className="loader-map">Loading map...</div> // Display loading message while map is not ready
      )}
    </div>
  );
}

export default App; // Exporting the App component for use in other parts of the application
