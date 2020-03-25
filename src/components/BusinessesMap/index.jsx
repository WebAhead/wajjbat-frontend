import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import path from 'path';
import PopupMarker from '../../pages/Home/components/PopupMarker'

export default ({ userPosition, businesses, google ,history}) => {
    const mapStyles = {
        position: 'relative',
        margin: 'auto',
        width: '100%',
        height: '90vh',
    };

    return (
        <div style={{ minHeight: '60vh' }}>
            <LoadScript
                id="hehe"
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
            >
                <GoogleMap
                    // google={google}
                    containerStyle={{ position: 'relative' }}
                    zoom={13}
                    mapContainerStyle={mapStyles}
                    center={{
                        lat: userPosition.lat,
                        lng: userPosition.lng,
                    }}
                >
                    <Marker
                        name={'User location'}
                        position={{
                            lat: +userPosition.lat,
                            lng: +userPosition.lng,
                        }}
                        icon={path.join(__dirname,'user-location.png')}
                    />

                    {/* optional in case we want to mark the position of the business */}
                    {businesses.map((business) => (
                        <PopupMarker
                            history={history}
                            business={business}
                            lat={+business.lat}
                            lng={+business.lng}
                            position={{
                                lat: +business.lat,
                                lng: +business.lng,
                            }}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}
