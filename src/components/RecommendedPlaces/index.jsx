import React from 'react';
import './RecommendedPlaces.scss';

const RecommendedPlaces = ({ places }) => {
  return (
    <div className="recommended-places">
      <h2>Recommended Places Nearby</h2>
      <div className="places-list">
        {places.map((place, index) => (
          <div key={index} className="place-card">
            {place.photoUrl ? (
              <img
                src={place.photoUrl}
                alt={place.name}
                className="place-image"
              />
            ) : (
              <div className="no-image-placeholder">No Image Available</div>
            )}
            <div className="place-info">
              <h3>{place.name}</h3>
              <p className="place-address">{place.vicinity}</p>
              <p className="place-status">
                {place.opening_hours?.open_now ? 'Open Now' : 'Closed'}
              </p>
              <p className="place-rating">Rating: {place.rating} / 5</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedPlaces;
