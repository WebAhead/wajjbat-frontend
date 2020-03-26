import React, { useState } from 'react';
import { Marker, InfoWindow, InfoBox } from '@react-google-maps/api';
import { Rating } from '@material-ui/lab';
import { FormattedMessage } from 'react-intl';
import path, { dirname } from 'path';
import './style.scss';

export default ({ lat, lng, business, history, setCurrentMarker, currentMarker }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Marker
            position={{ lat, lng }}
            onClick={() => setCurrentMarker(business.id)}
            icon={path.join(__dirname,'restaurant-pin-32.png')}

        >
            {currentMarker === business.id && (
                <InfoWindow
                    position={{
                        lat,
                        lng,
                        // lng: lng - 0.02222, Causes problems especially zooming in and out while popup is open
                    }}
                    options={{
                        closeBoxMargin: true
                    }}
                    onCloseClick={() => {
                        setIsOpen(false);
                        setCurrentMarker(false);
                    }}
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
                                <h5 className="type">
                                    <FormattedMessage id={business.type} />, <FormattedMessage id={business.cuisine} />
                                </h5>
                                <a style={{marginTop:'auto', marginBottom:'5px'}} href={`/business/${business.id}`}>
                                    <button className="grow">Go to business</button>
                                </a>
                            </ul>
                        </div>
                    </div>
                </InfoWindow>
            )}
        </Marker>
    );
};
