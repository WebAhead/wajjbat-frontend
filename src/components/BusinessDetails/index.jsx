import React from "react";
import "./style.scss";
import { Rating } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
import PlaceFeature from "../PlaceFeature";
import Contact from "../Contact";
export default function BusinessDetails({ businessData }) {
  if (businessData !== undefined) {
    return (
      <div className="Business-Details">
        <div className="business-content">
          <div className="upper-details-container">
            <div className="business-type">
              {businessData.type},
              {businessData.cuisine !== undefined
                ? businessData.cuisine
                : "cuisine"}
            </div>

            <div className="business-rating">
              <Rating
                name="half-rating"
                value={businessData.rating}
                precision={0.5}
                readOnly
                size="small"
              />
            </div>
          </div>
          <p className="business-name">{businessData.name}</p>
          <p className="business-description">{businessData.description}</p>
          <div className="business-bottom-content"></div>

          <div className="place-features">
            {Object.entries(businessData).map(placeFeature => {
              let featureName = placeFeature[0];
              let featureValue = placeFeature[1];

              if (
                featureName == "smokingArea" ||
                featureName == "parking" ||
                featureName == "freeWifi"
              ) {
                return (
                  <PlaceFeature feature={{ [featureName]: featureValue }} />
                );
              }
            })}
          </div>

          <div className="contact-container">
            <Contact email={businessData.email} phone={businessData.phone} />
          </div>

          <div className="address">
            <div className="business-address">{businessData.address}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="emptyBusinessDetails">
        <CircularProgress disableShrink />
      </div>
    );
  }
}
