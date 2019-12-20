import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Rating } from "@material-ui/lab";

import "./styles.scss";
export default function ReviewsCard(props) {
  return (
    <div className="container">
      <div className="review-outter-container">
        <div className="img-rating-container">
          <img
            className="profile-img"
            src={props.profile_image}
            height={"50px"}
            width={"50px"}
          />
          <p>{props.fullname}</p>
          <LinearProgress variant="determinate" value={props.rating * 10} />
          <Rating
            name="half-rating"
            value={props.rating}
            precision={0.5}
            readOnly
            size="small"
          />
        </div>
        <p className="date">{props.dateCreated}</p>
      </div>
      <div className="review-inner-container">
        <p>{props.review_body}</p>
      </div>
    </div>
  );
}
