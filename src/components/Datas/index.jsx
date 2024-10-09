import './Datas.scss';

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
    <div className="datas">
      <h2>Here is your information</h2>
      <p className="datas__content--label">
        Your public IP address is:{' '}
        {isLoadedIp ? (
          <span className="datas__content--data">{ip}</span>
        ) : (
          <span className="loader"></span>
        )}
      </p>
      {isLoadedIpDatas ? (
        <div className="datas__content">
          <p className="datas__content--label">
            In or near the city of:{' '}
            <span className="datas__content--data">
              {ipCity} (IP) - {geolocationCity} (Geoloc)
            </span>
          </p>
          <p className="datas__content--label">
            Country of location:{' '}
            <span className="datas__content--data">{ipCountry}</span>
          </p>
          <p className="datas__content--label">
            Latitude:{' '}
            <span className="datas__content--data">
              {ipLat} (IP) - {geoLat} (Geoloc)
            </span>
          </p>
          <p className="datas__content--label">
            Longitude:{' '}
            <span className="datas__content--data">
              {ipLon} (IP) - {geoLon} (Geoloc)
            </span>
          </p>
          <p className="datas__content--label">
            Région : <span className="datas__content--data">{ipRegion}</span>
          </p>
        </div>
      ) : (
        <div className="loader"></div>
      )}
    </div>
  );
};

export default Datas;
