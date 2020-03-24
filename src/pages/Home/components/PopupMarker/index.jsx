import React, { useState } from 'react';
import { Marker, InfoWindow, InfoBox } from '@react-google-maps/api';
import { Rating } from '@material-ui/lab';

import './style.scss';

export default ({ lat, lng, business, history }) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(business);

  return (
    <Marker
      position={{ lat, lng }}
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      {isOpen && (
        <InfoBox
          position={{
            lat: lat,
            lng: lng,
          }}
          onCloseClick={() => setIsOpen(false)}
        >
          <div className="popup-window">
            <div className="popup-info">
              <a
                onClick={() => history.push(`/business/${business.id}`)}
                className="business-image-link"
                href={`/business/${business.id}`}
              >
                <img
                  className="business-image"
                  src={business.image}
                  alt="businessimage"
                />
              </a>
              <ul className="business-info">
                <li>
                  <a
                    className="business-name"
                    href={`/business/${business.id}`}
                  >
                    {business.name}
                  </a>
                </li>
                <li className="rating">
                  <Rating
                    name="half-rating"
                    value={+business.rating}
                    precision={0.5}
                    readOnly
                    size="small"
                  />
                </li>
                <li className="business-info-text">{business.cuisine}</li>
                <li className="business-info-text">{business.type}</li>
              </ul>
            </div>
            <div className="popup-footer">
              <a className="business-link" href={`/business/${business.id}`}>
                <button className="grow">Go to business</button>
              </a>
            </div>
          </div>
        </InfoBox>
      )}
    </Marker>
  );
};
