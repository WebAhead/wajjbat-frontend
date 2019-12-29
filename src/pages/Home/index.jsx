import React, { useEffect, useState } from "react";
import SliderContainer from "../../components/Slider";
import BusinessesList from "../../components/BusinessesList";
import Footer from "../../components/Footer";
import "./style.scss";
import axios from "axios";

const endPointUrl = process.env.REACT_APP_API_URL;

export default function Homepage(props) {
  const [businesses, setBusinesses] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [userPosition, setUserPosition] = useState({});
  const [originalBusinesses, setOriginalBusinesses] = useState([]);
  const [filterByBusinessType, setFilterByBusinessType] = useState("All");
  const [filterByCuisineType, setFilterByCuisineType] = useState("All");
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
          lat: userPosition.lat,
          lng: userPosition.lng
        });
        setBusinesses(data.businesses);
        setOriginalBusinesses(data.businesses);
        setTopRated(data.topRated);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userPosition]);

  useEffect(() => {
    (async function filterBusinesses() {
      if (filterByBusinessType || filterByCuisineType) {
        setBusinesses(
          originalBusinesses.filter(
            business =>
              (business.type == filterByBusinessType ||
                filterByBusinessType == "All") &&
              (business.cuisine == filterByCuisineType ||
                filterByCuisineType == "All")
          )
        );
      }
    })();
  }, [filterByBusinessType, filterByCuisineType]);

  const filterBusinessesByTypeHandler = filterByBusinessType => {
    setFilterByBusinessType(filterByBusinessType.value);
  };

  const filterBusinessesByCuisineHandler = filterByCuisineType => {
    setFilterByCuisineType(filterByCuisineType.value);
  };

  return (
    <div>
      <SliderContainer topRated={topRated} userPosition={userPosition} />
      <BusinessesList businesses={businesses} userPosition={userPosition} />
      <Footer
        lang={props.lang}
        filterByType={filterBusinessesByTypeHandler}
        filterByCuisine={filterBusinessesByCuisineHandler}
      />
    </div>
  );
}
