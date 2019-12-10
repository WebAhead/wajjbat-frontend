import React, { useEffect, useState } from "react";
import axios from "axios";
import BusinessCard from "../BusinessCard";

const endPointUrl = `https://api.myjson.com/bins/wcdjs`;
export default function BusinessesList() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    (async function getBuisinesses() {
      try {
        const { data } = await axios.get(endPointUrl);
        setBusinesses(data.businesses);
      } catch (error) {
        throw new Error(error);
      }
    })();
  }, []);

  return (
    <React.Fragment>
      <div className="businesses-list">
        {businesses.map(business => (
          <BusinessCard key={business.id} business={business}></BusinessCard>
        ))}
      </div>
    </React.Fragment>
  );
}
