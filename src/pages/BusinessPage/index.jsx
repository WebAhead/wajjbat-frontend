import React, { useEffect, useState, Fragment } from "react";

import axios from "axios";
import Slider from "react-slick";
import "./style.scss";
import BusinessDetails from "../../components/BusinessDetails";
import BussinessReviews from "../../components/BusinessReviews";

export default function BusinessPage(props) {
  const [mainImage, setMainImage] = useState("");
  const [subImages, setSubImages] = useState([]);
  const [userPosition, setUserPosition] = useState({});
  const [businessData, setBusinessData] = useState([]);

  const [reviews, setReveiws] = useState("");

  useEffect(() => {
    (async function getImages() {
      const { data } = await axios.get(
        endPointUrl + "/api/businesses/" + props.match.params.id
      );
      setReveiws(data.reviews);
      setMainImage(data.primaryImage);
      setSubImages([...data.subImages, data.primaryImage]);
    })();
  }, [props.match.params.id]);

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

  useEffect(() => navigator.geolocation.getCurrentPosition(({ coords }) =>
    setUserPosition({ lat: coords.latitude, lng: coords.longitude })
  ), []);

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
          <button className="nav-button" to="">Details</button>
          <button className="nav-button" to="">Reviews</button>
        </div>
      </nav>

      <BusinessDetails businessData={businessData.details} userPosition={userPosition} />
    </Fragment>
  );
}
