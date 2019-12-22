import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
function GoogleMaps(props) {
  const mapStyles = {
    position: "relative",
    margin: "auto",
    width: "100%",
    height: "300px"
  };

  return (
    <div className="businessLocationWithGoogleMaps">
      <a
        href={`https://www.google.com/maps/dir/?api=1&origin=${props.userPosition.lat},${props.userPosition.lng}&destination=${props.businessLocation.lat},${props.businessLocation.lng}`}
      >
        <Map
          google={props.google}
          zoom={18}
          style={mapStyles}
          initialCenter={{
            lat: props.userPosition.lat,
            lng: props.userPosition.lng
          }}
        >
          {/* optional in case we want to mark the position of the business*/}
          <Marker
            position={{
              lat: props.businessLocation.lat,
              lng: props.businessLocation.lng
            }}
          />
        </Map>
      </a>
    </div>
  );
}

export default GoogleApiWrapper({})(GoogleMaps);
