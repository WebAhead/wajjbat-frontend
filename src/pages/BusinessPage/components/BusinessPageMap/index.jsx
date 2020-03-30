import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import path from 'path';

function ChooseLocation({ userPosition, businessPosition }) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userPosition.lat},${userPosition.lng}&destination=${businessPosition.lat},${businessPosition.lng}`;

  const getDirections = e => {
    window.open(directionsUrl, '_blank');
  };
  const mapStyles = {
    position: 'relative',
    margin: 'auto',
    width: '100%',
    height: '40vh',
  };
  return (
    <div style={{ minHeight: '40vh' }}>
      <LoadScript
        id="bzns-location-map"
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
      >
        <GoogleMap
          containerStyle={{
            height: '50vh',
            width: '50vw',
            position: 'relative',
          }}
          zoom={17}
          mapContainerStyle={mapStyles}
          center={{
            lat: +businessPosition.lat,
            lng: +businessPosition.lng,
          }}
        >
          <Marker
            name={'User location'}
            position={{
              lat: +userPosition.lat,
              lng: +userPosition.lng,
            }}
            icon={path.join(__dirname, 'user-location.png')}
          />

          <Marker
            onClick={getDirections}
            name={'Business location'}
            position={{
              lat: +businessPosition.lat,
              lng: +businessPosition.lng,
            }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default ChooseLocation;
