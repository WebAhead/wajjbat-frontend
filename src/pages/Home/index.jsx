import React, { useEffect, useState } from "react";
import SliderContainer from "../../components/Slider";
import BusinessesList from "../../components/BusinessesList";
import Footer from "../../components/Footer";
import "./style.scss";
import axios from "axios";

//test
import { DropDownList } from "@progress/kendo-react-dropdowns";

import Teste from "../../components/Teste";

const endPointUrl = process.env.REACT_APP_API_URL;

export default function Homepage(props) {
  const [businesses, setBusinesses] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [userPosition, setUserPosition] = useState({});
const [originalBusinesses, setOriginalBusinesses] = useState([])
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


                console.log("dataaa--- ",data);
                
        console.log("data.businesses : ", data.businesses);

        setBusinesses(data.businesses);
        setOriginalBusinesses(data.businesses)
        console.log("dtata top rated :", data.topRated);

        setTopRated(data.topRated);

        // console.log("after filtering : ",topRated.filter(business => business.rating >2));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userPosition]);

  // filtering test
  const [filterByBusinessType, setFilterByBusinessType] = useState("All");
  const [clicked, setClicked] = useState(0);
  // let clicked = 0;
  const [filterByCuisineType, setFilterByCuisineType] = useState("All");

  useEffect(() => {
    (async function filterBusinessesByType() {
      if (filterByBusinessType || filterByCuisineType) {
        console.log("top-- ", topRated);

        // setTopRated(topRated.filter(business => business.rating > clicked));

        console.log("original busss -- ",originalBusinesses);
        
        // const businessesAfterFilteringByType = originalBusinesses.filter(business => ((business.type== filterByBusinessType)));
        
        setBusinesses(originalBusinesses.filter(business => ((business.type== filterByBusinessType ||filterByBusinessType =="All")&&(businesses.cuisine == filterByCuisineType || filterByCuisineType =="All")) )  );

        // console.log("filterd busss -- ",originalBusinesses.filter(business => business.type== filterByBusinessType.value));

        console.log("--------------filterByBusinessType--------", filterByBusinessType);

        
      }
  
    })();
  }, [filterByBusinessType, filterByCuisineType,clicked]);


  // useEffect(() => {
  //   (async function filterBusinessesByCuisine() {
  //     if (filterByCuisineType) {
  //       console.log("top-- ", topRated);

  //       // setTopRated(topRated.filter(business => business.rating > clicked));

  //       console.log("original busss -- ",originalBusinesses);
        
  //       const businessesafterFilteringByType
  //       // setBusinesses(originalBusinesses.filter(business => (business.type== filterByBusinessType.value) &&(businesses.cuse ==filterBusinessesByCuisineHandler.value)   )  );

  //       // console.log("filterd busss -- ",originalBusinesses.filter(business => business.type== filterByBusinessType.value));

  //       // console.log("--------------filterByBusinessType--------", filterByBusinessType.value);

        
  //     }
  //   })();
  // }, [filterByCuisineType]);



  let x = () => {
    setClicked(clicked + 1);
    console.log("clicked :", clicked);
  };

  let businessTypeSelectHandler = e => {
    console.log("filterByBusinessType ", e.target.value);

    setFilterByBusinessType(e.target.value);
  };
  
  const filterBusinessesByTypeHandler = filterByBusinessType=>{
    console.log("filterBusinessesByTypeHandler  :" ,filterByBusinessType.value);
    setFilterByBusinessType(filterByBusinessType.value);
  } 


    const filterBusinessesByCuisineHandler = filterByCuisineType=>{
    console.log("filterBusinessesByCuisineHandler  :" ,filterByCuisineType.value);
    setFilterByCuisineType(filterByCuisineType.value);
  } 

  return (
    <div>
      <SliderContainer topRated={topRated} userPosition={userPosition} />
      <BusinessesList businesses={businesses} userPosition={userPosition} />
      <Footer lang={props.lang} filterByType={filterBusinessesByTypeHandler} filterByCuisine={filterBusinessesByCuisineHandler} />

      <button onClick={x}>clickme! </button>

      <select
        className="filterByBusinessTypeBusinessType"
        onChange={businessTypeSelectHandler}
      >
        <option value="Restaurant">Restaurant</option>
        <option value="Cafe">Cafe</option>
        <option value="Bar">Bar</option>
        <option value="Store">Store</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
}
