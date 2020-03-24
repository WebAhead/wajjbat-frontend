import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function ChooseLocation({ userPosition, google, changeState, latLng }) {
  const mapStyles = {
    position: 'relative',
    margin: 'auto',
    marginTop: '20px',
    width: '100%',
    height: '50vh',
  };

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}>
        <GoogleMap
          google={google}
          containerStyle={{ position: 'relative' }}
          zoom={13}
          style={mapStyles}
          initialCenter={{
            lat: userPosition.lat,
            lng: userPosition.lng,
          }}
        >
          <Marker
            onDragend={(event, t, coord) => {
              changeState({ lat: coord.latLng.lat(), lng: coord.latLng.lng() });
            }}
            draggable
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
