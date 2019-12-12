import React, { useEffect, useState } from "react";
import SliderContainer from "../../components/Slider";
import BusinessesList from "../../components/BusinessesList";
import axios from "axios";

const endPointUrl = process.env.REACT_APP_API_URL + "wcdjs";

export default function Homepage(props) {
  const [businesses, setBusinesses] = useState([]);
  const [topRated, setTopRated] = useState([]);
  useEffect(() => {
    (async function getBusinesses() {
      try {
        const { data } = await axios.get(endPointUrl);
        setBusinesses(data.businesses);
        setTopRated(data.topRated);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <SliderContainer topRated={topRated} />
      <BusinessesList businesses={businesses} />
    </div>
  );
}
