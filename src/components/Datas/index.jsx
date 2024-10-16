import './Datas.scss'; // Importing the stylesheet for styling the Datas component

// The Datas component receives props for displaying IP and geolocation information
const Datas = ({
  ip,
  isLoadedIp,
  isLoadedIpDatas,
  ipCity,
  geolocationCity,
  ipCountry,
  ipLat,
  ipLon,
  geoLat,
  geoLon,
  ipRegion,
}) => {
  return (
    <div className="datas"> {/* Main container for the component */}
      <h2>Here is your information</h2> {/* Heading for the displayed information */}
      
      {/* Displaying the public IP address */}
      <p className="datas__content--label">
        Your public IP address is:{' '}
        {isLoadedIp ? (
          <span className="datas__content--data">{ip}</span> // Show IP if loaded
        ) : (
          <span className="loader"></span> // Show loader if not loaded
        )}
      </p>

      {/* Conditional rendering based on whether IP data has been loaded */}
      {isLoadedIpDatas ? (
        <div className="datas__content"> {/* Container for IP data */}
          {/* Displaying city information */}
          <p className="datas__content--label">
            In or near the city of:{' '}
            <span className="datas__content--data">
              {ipCity} (IP) - {geolocationCity} (Geoloc) {/* Show IP and geolocation city */}
            </span>
          </p>

          {/* Displaying country information */}
          <p className="datas__content--label">
            Country of location:{' '}
            <span className="datas__content--data">{ipCountry}</span> {/* Show country */}
          </p>

          {/* Displaying latitude information */}
          <p className="datas__content--label">
            Latitude:{' '}
            <span className="datas__content--data">
              {ipLat} (IP) - {geoLat} (Geoloc) {/* Show IP and geolocation latitude */}
            </span>
          </p>

          {/* Displaying longitude information */}
          <p className="datas__content--label">
            Longitude:{' '}
            <span className="datas__content--data">
              {ipLon} (IP) - {geoLon} (Geoloc) {/* Show IP and geolocation longitude */}
            </span>
          </p>

          {/* Displaying region information */}
          <p className="datas__content--label">
            Région : <span className="datas__content--data">{ipRegion}</span> {/* Show region */}
          </p>
        </div>
      ) : (
        <div className="loader"></div> // Show loader if IP data is not loaded
      )}
    </div>
  );
};

export default Datas; // Exporting the Datas component for use in other parts of the application
