import React from "react";

export default function PlaceFeature({ featureValue, label }) {
  // in the first two lies we use regular expression in order to split by camel case
  return (
    <div className="placeFeature">
      <div
        style={{
          color: featureValue ? "green" : "red"
        }}
      >
        <span style={{ color: 'black' }}>{label} </span>
        {featureValue ? "✔" : "✘"}
      </div>
    </div>
  );
}
