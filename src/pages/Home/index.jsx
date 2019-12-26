import React, { useEffect, useState } from "react";
import SliderContainer from "../../components/Slider";
import BusinessesList from "../../components/BusinessesList";
import Footer from "../../components/Footer";

import axios from "axios";

const endPointUrl = process.env.REACT_APP_API_URL;

export default function Homepage(props) {
  const [businesses, setBusinesses] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [userPosition, setUserPosition] = useState({});
  useEffect(() => {
    (async function getBusinesses() {
      try {
        const { data } = await axios.get(endPointUrl + "wcdjs");
        setBusinesses(data.businesses);
        setTopRated(data.topRated);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (userPosition.lat !== undefined) {
    // Check if the user browser support storage to save the location info in the sessionStorage
    if (typeof Storage !== "undefined") {
      sessionStorage.setItem("userPosition", JSON.stringify(userPosition));
    }
  }

  useEffect(() => {
    //here we get the user location  after the user approve using
    //The HTML Geolocation API which is used to locate a user's position.

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) =>
        setUserPosition({ lat: coords.latitude, lng: coords.longitude })
      );
    }
  }, []);

  useEffect(() => {
    (async function getBusinesses() {
      try {
        const { data } = await axios.post(`${endPointUrl}/api/businesses`, {
          body: {
            lat: userPosition.lat,
            lng: userPosition.lng
          }
        });
        setBusinesses(data.businesses);
        setTopRated(data.topRated);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userPosition]);

  return (
    <div>
      <SliderContainer topRated={topRated} userPosition={userPosition} />
      <BusinessesList businesses={businesses} userPosition={userPosition} />
      <Footer lang={props.lang}/>
    </div>
  );
}
