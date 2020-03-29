import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';
import path from 'path';
import PopupMarker from '../../pages/Home/components/PopupMarker';

export default ({ userPosition, businesses, history, radius }) => {
    const [currentMarker, setCurrentMarker] = useState(false);
    const [zoom, setZoom] = useState(13.1);

    const mapStyles = {
        position: 'relative',
        margin: 'auto',
        width: '100%',
        height: '90vh',
    };
    // Bellow I'm trying to determine the right zoom to fit the chosen radius
    // ITS STILL INCORRECT
    // eslint-disable-next-line
    useEffect(() => {
        setZoom(() => Math.log(80000 / (+radius) ** 2) / Math.log(2));
    }, [radius]);

    return (
        <div style={{ minHeight: '60vh' }}>
            <LoadScript
                id="hehe"
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
            >
                <GoogleMap
                    // google={google}
                    containerStyle={{ position: 'relative' }}
                    zoom={zoom}
                    mapContainerStyle={mapStyles}
                    center={{
                        lat: userPosition.lat,
                        lng: userPosition.lng,
                    }}
                    // fitBounds={
                    //     {
                    //         lat: userPosition.lat + +radius*1000/110.574,
                    //         lng: userPosition.lng + +radius/110.574,
                    //     }
                    // }
                >
                    <Circle
                        center={{
                            lat: userPosition.lat,
                            lng: userPosition.lng,
                        }}
                        radius={+radius * 1000}
                        options={{
                            strokeColor: '#21B5A2',
                            strokeOpacity: 0.7,
                            strokeWeight: 2,
                            fillColor: '#21B5A2',
                            fillOpacity: 0.2,
                        }}
                    />
                    <Marker
                        name="User location"
                        position={{
                            lat: +userPosition.lat,
                            lng: +userPosition.lng,
                        }}
                        icon={path.join(__dirname, 'user-location.png')}
                    />

                    {/* optional in case we want to mark the position of the business */}
                    {businesses.map(business => (
                        <PopupMarker
                            history={history}
                            business={business}
                            lat={+business.lat}
                            lng={+business.lng}
                            position={{
                                lat: +business.lat,
                                lng: +business.lng,
                            }}
                            setCurrentMarker={setCurrentMarker}
                            currentMarker={currentMarker}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};
