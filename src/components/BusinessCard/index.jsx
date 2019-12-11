import React from "react";
import { Rating } from "@material-ui/lab";
import "./style.scss";

export default function BusinessCard({ business }) {
  return (
    <React.Fragment>
      <div className="business-card">
        <div className="business-img">
          <img src={business.image} alt="alt" />
        </div>
        <div className="business-content">
          <p className="business-name">{business.name}</p>
          <p className="business-description">{business.description}</p>
          <div className="business-bottom-content">
            <div className="business-type">{business.type}</div>
            <div className="business-rating">
              <Rating
                name="half-rating"
                value={business.rating}
                precision={0.5}
                readOnly
                size="small"
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
