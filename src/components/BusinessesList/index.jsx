import React from "react";
import BusinessCard from "../BusinessCard";
import { Link } from "react-router-dom";
import "./style.scss";

export default function BusinessesList({ businesses, homeView, cardWidth }) {
  return (
    <React.Fragment>
      <div className="businesses-list">
        {businesses.map(business => (
          <Link
            key={business.id}
            to={{
              pathname: `/business/${business.id}`
            }}
          >
            <BusinessCard
              business={business}
              homeView={homeView}
              cardWidth={cardWidth}
            />
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
}
