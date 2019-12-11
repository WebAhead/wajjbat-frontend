import React, { useEffect, useState } from "react";
import SliderContainer from "../../components/Slider";
import NavBar from "../../components/NavBar/index";
import BusinessesList from "../../components/BusinessesList";
import axios from "axios";

const endPointUrl = process.env.REACT_APP_API_URL;

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
      <NavBar lang={props.lang} />
      <SliderContainer topRated={topRated} />
      <BusinessesList businesses={businesses} />
    </div>
  );
}
