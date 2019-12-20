import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import ReviewsCard from "./ReviewsCard";
import "./styles.scss";

export default function BusinessReviews(props) {
  const handleReviews = () => {
    if (!props.reviews.length) {
      return "";
    }
    return props.reviews.map((currentReview, index) => {
      return (
        <ReviewsCard
          rating={currentReview.rating}
          fullname={currentReview.fullname}
          profile_image={currentReview.profile_image}
          dateCreated={currentReview.dateCreated}
          review_body={currentReview.review_body}
        />
      );
    });
  };
  return (
    <div>
      <h1>Reviews</h1>
      <div className="rating-container">
        <p>5</p>
        <LinearProgress variant="determinate" value={50} />
      </div>
      <div className="rating-container">
        <p>4</p>
        <LinearProgress variant="determinate" value={50} />
      </div>
      <div className="rating-container">
        <p>3</p>
        <LinearProgress variant="determinate" value={50} />
      </div>
      <div className="rating-container">
        <p>2</p>
        <LinearProgress variant="determinate" value={50} />
      </div>
      <div className="rating-container">
        <p>1</p>
        <LinearProgress variant="determinate" value={50} />
      </div>
      <div>{handleReviews()}</div>
    </div>
  );
}
