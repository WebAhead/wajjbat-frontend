import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import path from 'path';
function ChooseLocation({ userPosition, google, setBusinessLatlng, latLng }) {
  const mapStyles = {
    position: 'relative',
    margin: 'auto',
    width: '100%',
    height: '40vh',
  };
  console.log(`user pos is : ${userPosition.lat}`);
  return (
    <div style={{ minHeight: '40vh' }}>
      <LoadScript
        id="add-bzns"
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
      >
        <GoogleMap
          containerStyle={{
            height: '50vh',
            width: '50vw',
            position: 'relative',
          }}
          zoom={13}
          mapContainerStyle={mapStyles}
          center={{
            lat: latLng.lat,
            lng: latLng.lng,
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
            onDragEnd={event => {
              setBusinessLatlng({
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
              });
            }}
            draggable={true}
            position={
              latLng.lat
                ? latLng
                : {
                    lat: userPosition.lat,
                    lng: userPosition.lng,
                  }
            }
          />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default ChooseLocation;
