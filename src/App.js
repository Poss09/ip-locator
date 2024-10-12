import { useState, useEffect } from 'react';
import Header from './components/Header/';
import Datas from './components/Datas/';
import Map from './components/Map/';
import './_shared.scss';

function App() {
  const [IpDatas, setIpDatas] = useState({});
  const [isLoadedIp, setIsLoadedIp] = useState(false);
  const [isLoadedIpDatas, setIsLoadedIpDatas] = useState(false);
  const [geolocationCity, setGeolocationCity] = useState('');
  const [geoLat, setGeoLat] = useState(null);
  const [geoLon, setGeoLon] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    console.log('App mounted');
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Geolocation success:', position.coords);
          setGeoLat(position.coords.latitude);
          setGeoLon(position.coords.longitude);
        },
        (error) => {
          console.error('Error getting geolocation: ', error.message);
        }
      );
    } else {
      console.log('Geolocation not supported');
    }
  }, []);

  const fetchIp = async () => {
    const url = process.env.REACT_APP_API_URL;
    console.log('Fetching IP data from:', url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('IP data received:', data);
      
      const parsedData = { 
        ip: data.ip, 
        latitude: parseFloat(data.latitude), 
        longitude: parseFloat(data.longitude), 
        city: data.city,
        country: data.country,
        region: data.region,
      };
      console.log('Parsed IP data:', parsedData);
      
      setIpDatas(parsedData);
      setIsLoadedIp(true);
      setIsLoadedIpDatas(true);
      setIsMapReady(true);
    } catch (error) {
      console.error('Error fetching IP data: ', error.message);
    }
  };

  const fetchCityFromGeolocation = async (lat, lon) => {
    console.log(`Fetching city data for coordinates: ${lat}, ${lon}`);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('City data received:', data);
      setGeolocationCity(data.address.village || data.address.city || '');
    } catch (error) {
      console.error('Error fetching city data: ', error.message);
    }
  };

  useEffect(() => {
    console.log('Fetching IP data');
    fetchIp();
  }, []);

  useEffect(() => {
    console.log('Geolocation updated:', { geoLat, geoLon });
    if (geoLat !== null && geoLon !== null) {
      fetchCityFromGeolocation(geoLat, geoLon);
    }
  }, [geoLat, geoLon]);

  const getValidCoordinates = () => {
    console.log('Getting valid coordinates');
    console.log('IP coordinates:', { lat: IpDatas.latitude, lon: IpDatas.longitude });
    console.log('Geolocation coordinates:', { lat: geoLat, lon: geoLon });
    
    if (isFinite(IpDatas.latitude) && isFinite(IpDatas.longitude)) {
      console.log('Using IP coordinates');
      return { lat: IpDatas.latitude, lon: IpDatas.longitude };
    }
    if (isFinite(geoLat) && isFinite(geoLon)) {
      console.log('Using geolocation coordinates');
      return { lat: geoLat, lon: geoLon };
    }
    console.log('Using default coordinates');
    return { lat: 0, lon: 0 };
  };

  const { lat, lon } = getValidCoordinates();
  console.log('Final coordinates for map:', { lat, lon });

  return (
    <div className="main">
      <Header />
      <Datas
        ip={IpDatas.ip}
        isLoadedIp={isLoadedIp}
        isLoadedIpDatas={isLoadedIpDatas}
        ipCity={IpDatas.city}
        geolocationCity={geolocationCity}
        ipCountry={IpDatas.country}
        ipLat={IpDatas.latitude}
        ipLon={IpDatas.longitude}
        geoLat={geoLat}
        geoLon={geoLon}
        ipRegion={IpDatas.region}
      />
      {isMapReady ? (
        <Map IpLat={lat} IpLon={lon} geoLat={geoLat} geoLon={geoLon} />
      ) : (
        <div className="loader-map">Loading map...</div>
      )}
    </div>
  );
}

export default App;