import React, { useEffect, useState, Fragment } from "react";

import axios from "axios";
import "./style.scss";
import BusinessDetails from "../../components/BusinessDetails";
import BusinessReviews from "../../components/BusinessReviews";
import { Route, Link } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import BusinessPageImageGallery from '../../components/BusinessPageImageGallery';

export default function BusinessPage(props) {
  const [userPosition, setUserPosition] = useState({});
  const [businessData, setBusinessData] = useState({});

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
    <Fragment>
      {businessData.primaryImage &&
        <BusinessPageImageGallery
          defaultMainImage={businessData.primaryImage}
          defaultSubImages={[...businessData.subImages, businessData.primaryImage]}
        />
      }


      <nav className="business-page-nav">
        <div className="nav-items">
          <Link className="nav-button" to={`/business/${props.match.params.id}`}>Details</Link>
          <Link className="nav-button" to={`/business/${props.match.params.id}/reviews`}>Reviews</Link>
        </div>
      </nav>

      <AnimatedSwitch
        atEnter={{ offset: 100 }}
        atLeave={{}}
        atActive={{ offset: 0 }}
        mapStyles={styles => ({
          transform: `translateX(${styles.offset}%)`,
        })}
      >
        <Route
          path={`/business/:id`}
          exact
          component={() => <BusinessDetails businessData={businessData.details} userPosition={userPosition} />}
        />
        <Route
          path={`/business/:id/reviews`}
          exact
          component={() => <BusinessReviews reviews={reviews} />}
        />

      </AnimatedSwitch>
    </Fragment >
  );
}
