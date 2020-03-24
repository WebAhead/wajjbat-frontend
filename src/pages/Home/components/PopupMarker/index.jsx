import React, { useState } from 'react';
import { Marker, InfoWindow, InfoBox } from '@react-google-maps/api';
import { useHistory } from 'react-router-dom';
import './style.scss';

export default ({ lat, lng, business }) => {
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();

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
                        <a 
                            className="business-image"
                            href={`/business/${business.id}`}
                        >
                            <img
                                className="business-image"
                                src={business.image}
                                alt="businessimage"
                            />
                        </a>
                        <ul className="business-data">
                            <li><a href={`/business/${business.id}`}>{business.name}</a></li>
                            <li>{business.rating}</li>
                            <li>{business.cuisine}</li>
                            <li>{business.type}</li>
                            <li><a href={`/business/${business.id}`}>Go to business</a></li>
                        </ul>
                    </div>
                </InfoBox>
            )}
        </Marker>
    );
};
