import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

function BusiessesMap({ userPosition, businesses, google }) {
    const mapStyles = {
        position: 'relative',
        margin: 'auto',
        width: '100%',
        height: '60vh',
    };

    return (
        <div style={{ minHeight: '60vh' }}>
            <Map
                google={google}
                containerStyle={{ position: 'relative' }}
                zoom={13}
                style={mapStyles}
                initialCenter={{
                    lat: userPosition.lat,
                    lng: userPosition.lng,
                }}
            >
                {/* optional in case we want to mark the position of the business */}
                {businesses.map((business) => (
                    <Marker
                        position={{
                            lat: business.lat,
                            lng: business.lng,
                        }}
                    />
                ))}
            </Map>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
})(BusiessesMap);
