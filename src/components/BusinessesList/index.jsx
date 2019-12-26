import React from "react";
import BusinessCard from "../BusinessCard";
import { Link } from "react-router-dom";
import "./style.scss";

export default function BusinessesList({ businesses, userPosition }) {
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
            <BusinessCard business={business} />
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
}
