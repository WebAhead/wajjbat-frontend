import React from "react";
import { Link } from "react-router-dom";
import BusinessSlide from "../BusinessSlide";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function SliderContainer({ topRated }) {
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
        {topRated.map((currentBus, index) => (
          <Link
            key={currentBus.id}
            to={{
              pathname: `/business/${currentBus.id}`,
              business: { ...currentBus }
            }}
          >
            <BusinessSlide
              key={index}
              description={currentBus.description}
              image={currentBus.image}
              name={currentBus.name}
              rating={currentBus.rating}
              type={currentBus.type}
            />
          </Link>
        ))}
      </Slider>
    );
  };
  return (
    <div style={{ maxWidth: "100vw", marginTop: 15 }}>
      <div>{carouselSet()}</div>
    </div>
  );
}
