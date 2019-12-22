import React from "react";
import { Rating } from "@material-ui/lab";
import "./styles.scss";
export default function ReviewCard(props) {
  return (
    <div className="review-container">
      <p className="date">{props.dateCreated}</p>
      <div className="img-rating-container">
        <p>{props.fullname}</p>
        <img
          className="profile-img"
          src={props.profile_image}
          height={"50px"}
          width={"50px"}
        />
        <Rating
          name="half-rating"
          value={props.rating}
          precision={0.5}
          readOnly
          size="small"
        />
        <div className="review-inner-container">
          <p>{props.review_body}</p>
        </div>
      </div>
    </div>
  );
}
