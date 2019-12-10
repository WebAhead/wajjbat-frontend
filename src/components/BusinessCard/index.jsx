import React from "react";
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
            {/* this will be replaced by Rating component */}
            <div className="business-rating">{business.rating}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
