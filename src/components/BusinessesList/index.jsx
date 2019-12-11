import React from "react";
import BusinessCard from "../BusinessCard";
import { Link } from "react-router-dom";
import "./style.scss";

export default function BusinessesList({ businesses }) {
  return (
    <React.Fragment>
      <div className="businesses-list">
        {businesses.map(business => (
          <Link
            key={business.id}
            to={{
              pathname: `/businessProfile/${business.id}`,
              business: { ...business }
            }}
          >
            <BusinessCard business={business} />
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
}
