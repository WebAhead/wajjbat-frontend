import React, { useEffect, useState, Fragment } from "react";
import { Rating } from "@material-ui/lab";

import axios from "axios";
import Slider from "react-slick";
import "./style.scss";
import GoogleMaps from "../../components/GoogleMaps";
import BusinessDetails from "../../components/BusinessDetails";
const endPointUrl = process.env.REACT_APP_API_URL + "12curc";

export default function BusinessPage(props) {
  const [mainImage, setMainImage] = useState("");
  const [subImages, setSubImages] = useState([]);
  const [userPosition, setUserPosition] = useState({});
  const [businessData, setBusinessData] = useState([]);

  useEffect(() => {
    (async function getImages() {
      const { data } = await axios.get(endPointUrl);
      setMainImage(data.images.primaryImage);
      setSubImages([...data.images.subImages, data.images.primaryImage]);
      setBusinessData(data);
      if (sessionStorage.getItem("userPosition") !== null) {
        const tempUserPosition = await JSON.parse(
          sessionStorage.getItem("userPosition")
        );
        setUserPosition(tempUserPosition);
      }
    })();
  }, []);

  const settings = {
    infinite: true,
    arrows: false,
    speed: 200,
    afterChange: index => {
      setMainImage(subImages[index]);
    },
    slidesToShow: subImages.length > 3 ? 3 : 1,
    autoplay: true
  };

  // here we check if the we can get the user location using the props if not we check if
  //we can get the user position/location from the session storage if we did not found any data about it we
  //use Geolocation API which help us to detect the user position/location after getting/asking his permission

  useEffect(() => {
    (async function settingUserLocation() {
      if (
        //here we check if we can get the user position  from the props
        props.location.userPosition !== undefined &&
        Object.entries(userPosition).length === 0 &&
        userPosition.constructor === Object
      ) {
        setUserPosition(props.location.userPosition.userPosition);
        sessionStorage.setItem(
          "userPosition",
          JSON.stringify(props.location.userPosition.userPosition)
        );
        return;
      } else if (
        //here we check if we can get the user position from the session storage
        props.location.userPosition === undefined &&
        Object.entries(userPosition).length === 0 &&
        userPosition.constructor === Object
      ) {
        if (sessionStorage.getItem("userPosition") !== null) {
          const tempUserPosition = await JSON.parse(
            sessionStorage.getItem("userPosition")
          );
          setUserPosition(tempUserPosition);
          return;
        }
        if (
          //here we do our last try to get the user position using Geolocation API
          // so at firstly we check if the browser support Geolocation API
          navigator.geolocation &&
          Object.entries(userPosition).length === 0 &&
          userPosition.constructor === Object
        ) {
          navigator.geolocation.getCurrentPosition(({ coords }) => {
            setUserPosition({ lat: coords.latitude, lng: coords.longitude });
            sessionStorage.setItem(
              "userPosition",
              JSON.stringify({ lat: coords.latitude, lng: coords.longitude })
            );
          });
        }
      }
    })();
  }, []);

  return (
    <Fragment>
      <header className="business-page-header">
        <div className="main-image">
          <img src={mainImage} alt="" />
        </div>
        <div className="sub-images">
          <Slider {...settings}>
            {subImages.map((subImage, index) => (
              <img src={subImage} key={index + 1} alt="" />
            ))}
          </Slider>
        </div>
      </header>

      <nav className="business-page-nav">
        <div className="nav-items">
          <button to="">Details</button>
          <button to="">Menu</button>
          <button to="">Reviews</button>
        </div>
      </nav>

      <BusinessDetails businessData={businessData.details} />

      {/* i will remove it later i just want to check something */}
      <div className="directions-googleMaps">
        <GoogleMaps
          userPosition={userPosition}
          businessLocation={
            businessData.details !== undefined
              ? { lat: businessData.details.lat, lng: businessData.details.lng }
              : ""
          }
        />
      </div>
    </Fragment>
  );
}
