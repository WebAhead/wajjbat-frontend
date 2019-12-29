import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.scss";
import ReviewCard from "../../components/ReviewCard/index";
const endPointUrl = process.env.REACT_APP_API_URL;

function ProfilePage(props) {
  const [reviews, setReviews] = useState("");
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    axios
      .get(`${endPointUrl}/api/getUserReviews`, { withCredentials: "true" })
      .then(res => {
        setReviews(res.data.reviews);
        setUserDetails({ ...res.data.userDetails });
      })
      .catch(error => error);
  }, []);
  const handleUserDetails = () => {
    return (
      <div className="profile-container">
        <img src={userDetails.profilePic} />
        <p>{userDetails.lastName}</p>
        <p>{userDetails.firstName}</p>
      </div>
    );
  };
  const handleReviews = () => {
    return reviews.map(currentReview => {
      return (
        <ReviewCard
          fullname={currentReview.businessname}
          rating={currentReview.rating}
          review_body={currentReview.reviewbody}
          dateCreated={currentReview.reviewdate}
        />
      );
    });
  };

  if (!reviews.length && !userDetails.firstname) {
    return "dsadasasddas";
  }
  return (
    <div>
      <div className="navbar-container">
        <button>Profile</button>
        <button>Business</button>
      </div>
      {handleUserDetails()}
      {handleReviews()}
    </div>
  );
}

export default ProfilePage;
