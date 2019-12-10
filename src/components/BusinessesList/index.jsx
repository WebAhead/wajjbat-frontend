import React, { useEffect, useState } from "react";
import http from "../../services/httpService";
import BusinessCard from "../BusinessCard";

const endPointUrl = `https://api.myjson.com/bins/wcdjs`;
export default function BusinessesList() {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    (async function getBuisinesses() {
      const { data } = await http.get(endPointUrl);
      setBusinesses(data.businesses);
    })();
  }, []);
  console.log("res: ", businesses);
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
