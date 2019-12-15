import React, { useEffect, useState } from "react";
import SliderContainer from "../../components/Slider";
import BusinessesList from "../../components/BusinessesList";
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

  useEffect(() => {
    console.log("topRated", topRated);
    console.log("businesses", businesses);
  });

  //here we get the user location by after they approve using The HTML Geolocation API which is used to locate a user's position.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { coords } = position;
        setUserPosition({ lat: coords.latitude, lng: coords.longitude });
      });
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
      <SliderContainer topRated={topRated} />
      <BusinessesList businesses={businesses} />
    </div>
  );
}
