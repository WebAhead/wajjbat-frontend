import React from "react";

export default function PlaceFeature({ feature }) {
  if (feature !== undefined) {
    // in the first two lies we use regular expression in order to split by camel case
    let featureName = Object.keys(feature)[0].replace(
      /([a-z])([A-Z])/g,
      "$1 $2"
    );
    // here we make just the first letter of every word bigger
    featureName = featureName.charAt(0).toUpperCase() + featureName.slice(1);
    const featureValue = Object.values(feature)[0];

    return (
      <div className="placeFeature">
        <div
          className={`${featureName}`}
          style={{
            color: featureValue ? "green" : "red"
          }}
        >
          <span>{`${featureName}`} </span>
          {featureValue ? "✔" : "✘"}
        </div>
      </div>
    );
  } else {
    return <div className="emptyFeatureObject"></div>;
  }
}
