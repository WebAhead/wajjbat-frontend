import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';
import path from 'path';
import SearchBar from 'components/SearchBar';
import './style.scss';

import PopupMarker from '../../pages/Home/components/PopupMarker';

export default ({ userPosition, businesses, history, radius, originalBusinesses, setSearchData }) => {
    const [currentMarker, setCurrentMarker] = useState(false);
    const [zoom, setZoom] = useState(14);

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
        if(radius)
            setZoom(() =>{
                let calcFormula = Math.log(80000 / (+radius) ** 2) / Math.log(2) ;
                if(radius<=2) calcFormula-=1;
                if(radius<1) calcFormula-=1;
                return calcFormula;
            });
    }, [radius]);

    return (
        <div style={{ minHeight: '60vh', position: 'relative' }}>
            <div className="mapSearchWrapper">
                <SearchBar
                    businesses={originalBusinesses}
                    setSearchData={setSearchData}
                />
            </div>
            <LoadScript
                id="hehe"
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
            >
                <GoogleMap
                    containerStyle={{ position: 'relative' }}
                    zoom={zoom}
                    mapContainerStyle={mapStyles}
                    center={{
                        lat: userPosition.lat,
                        lng: userPosition.lng,
                    }}
                    disableDefaultUI="true"
                    // fitBounds={
                    //     {
                    //         lat: userPosition.lat + +radius*1000/110.574,
                    //         lng: userPosition.lng + +radius/110.574,
                    //     }
                    // }
                >
                    {radius && (
                        <Circle
                            center={{
                                lat: userPosition.lat,
                                lng: userPosition.lng,
                            }}
                            radius={+radius * 1000}
                            options={{
                                strokeColor: '#21B5A2',
                                strokeOpacity: 0.5,
                                strokeWeight: 2,
                                fillColor: '#21B5A2',
                                fillOpacity: 0.1,
                            }}
                        />
                    )}

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
