import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

function GoogleMaps({ userPosition, businesses, google }) {
    const mapStyles = {
        position: 'relative',
        margin: 'auto',
        width: '100%',
        height: '500px',
    };
    console.log(userPosition)
    return (
        <Map
            google={google}
            containerStyle={{ position: 'relative' }}
            zoom={14}
            style={mapStyles}
            mapTypeControl={false}
            initialCenter={{
                lat: userPosition.lat,
                lng: userPosition.lng,
            }}
            fullscreenControl={false}
            // panControl={false}
            streetViewControl={false}
            options={{ gestureHandling: 'greedy' }}
        >
            <Marker
                title="your location"
                position={{
                    lat: userPosition.lat,
                    lng: userPosition.lng,
                }}
            />
            {/* optional in case we want to mark the position of the business */}
            {businesses.map((location) => (
                <Marker
                    position={{
                        lat: location.lat,
                        lng: location.lng,
                    }}
                />
            ))}
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
})(GoogleMaps);
