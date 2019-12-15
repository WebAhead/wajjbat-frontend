import React, { useEffect, useState, Fragment } from "react";

import axios from "axios";
import Slider from "react-slick";
import "./style.scss";
import GoogleMaps from "../../components/GoogleMaps";

const endPointUrl = process.env.REACT_APP_API_URL + "12curc";

export default function BusinessPage(props) {
  const [mainImage, setMainImage] = useState("");
  const [subImages, setSubImages] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    (async function getImages() {
      const { data } = await axios.get(endPointUrl);
      setMainImage(data.images.primaryImage);
      setSubImages([...data.images.subImages, data.images.primaryImage]);
    })();
  }, []);
  console.log("subImg: ", subImages.length);
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
<GoogleMaps/>
      

    </Fragment>
  );
}

// export default GoogleApiWrapper({
// })(BusinessPage);