import React, { useState } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

function GoogleMaps(props) {
  const [center, setCenter] = useState({ lat: 11.0168, lng: 76.9558 });
  const [zoom, setZoom] = useState(11);
  const mapStyles = {
    position: "relative",
    margin: "auto",
    width: "30%",
    height: "30%"
  };

  return (
    <div className="businessLocationWithGoogleMaps">
      <Map
        google={props.google}
        zoom={2}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
      />
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDOva0h1n4tXsoyQmLtdDC_r-nQpm3owvQ"
})(GoogleMaps);
