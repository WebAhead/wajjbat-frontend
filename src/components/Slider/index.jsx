import React, { useEffect, useState } from "react";
import axios from "axios";
import BusinessSlide from "../BusinessSlide";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export default function SliderContainer() {
  const [businesses, getBusinesses] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.myjson.com/bins/wcdjs")
      .then(data => getBusinesses(data.data.topRated));
  }, []);
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    arrows: false
  };
  const carouselSet = () => {
    return (
      <Slider {...settings}>
        {businesses.map((currentBus, index) => (
          <BusinessSlide
            key={index}
            description={currentBus.description}
            image={currentBus.image}
            name={currentBus.name}
            rating={currentBus.rating}
            type={currentBus.type}
          />
        ))}
      </Slider>
    );
  };
  return (
    <div style={{ maxWidth: "100vw" }}>
      <div>{carouselSet()}</div>
    </div>
  );
}
