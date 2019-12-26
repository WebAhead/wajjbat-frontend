import React, { useEffect, useState, Fragment } from "react";

import axios from "axios";
import "./style.scss";
import BusinessDetails from "../../components/BusinessDetails";
import BusinessReviews from "../../components/BusinessReviews";
import BusinessPageImageGallery from '../../components/BusinessPageImageGallery';
import { Slide } from '@material-ui/core';

export default function BusinessPage(props) {
  const [userPosition, setUserPosition] = useState({});
  const [businessData, setBusinessData] = useState({});
  const [activeTab, setActiveTab] = useState('details');
  const [reviews, setReveiws] = useState("");

  useEffect(() => {
    (async function getImages() {
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "/api/businesses/" + props.match.params.id
      );
      setReveiws(data.reviews);
      setBusinessData(data)
    })();
  }, [props.match.params.id]);


  useEffect(() => navigator.geolocation.getCurrentPosition(({ coords }) =>
    setUserPosition({ lat: coords.latitude, lng: coords.longitude })
  ), []);


  return (
    <div style={{ minHeight: '100vh' }}>
      {businessData.primaryImage &&
        <BusinessPageImageGallery
          defaultMainImage={businessData.primaryImage}
          defaultSubImages={[...businessData.subImages, businessData.primaryImage]}
        />
      }


      <nav className="business-page-nav">
        <div className="nav-items">
          <button className="nav-button" onClick={() => setActiveTab('details')}>Details</button>
          <button className="nav-button" onClick={() => setActiveTab('reviews')}>Reviews</button>
        </div>
      </nav>

      <Slide direction="left" in={activeTab === 'details'} mountOnEnter unmountOnExit>
        <div>
          <BusinessDetails businessData={businessData.details} userPosition={userPosition} />
        </div>
      </Slide>
      <Slide direction="left" in={activeTab === 'reviews'} mountOnEnter unmountOnExit>
        <div>
          <BusinessReviews reviews={reviews} />
        </div>
      </Slide>
    </div>
  );
}
