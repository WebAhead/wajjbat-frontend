import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";

import ReviewCard from "../ReviewCard";
import "./styles.scss";

export default function BusinessReviews(props) {
  const useStyles = makeStyles({
    root: {
      width: "80%",
      display: "flex",
      alignSelf: "center",
      margin: "5px",
      height: "7px"
    },
    barColorPrimary: { backgroundColor: "#16F4D0" },
    colorPrimary: { backgroundColor: "#21b5a2" }
  });
  const classes = useStyles();

  const handleReviews = () => {
    if (!props.reviews.length) {
      return "";
    }
    return props.reviews.map((currentReview, index) => {
      return (
        <ReviewCard
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
    <div style={{ marginTop: '10px' }}>
      <h1 className="reviews-h1">Reviews</h1>
      <div className="rating-container">
        <p>5</p>
        <LinearProgress
          classes={{
            root: classes.root,
            barColorPrimary: classes.barColorPrimary,
            colorPrimary: classes.colorPrimary
          }}
          variant="determinate"
          value={50}
        />
      </div>
      <div className="rating-container">
        <p>4</p>
        <LinearProgress
          classes={{
            root: classes.root,
            barColorPrimary: classes.barColorPrimary,
            colorPrimary: classes.colorPrimary
          }}
          variant="determinate"
          value={50}
        />
      </div>
      <div className="rating-container">
        <p>3</p>
        <LinearProgress
          classes={{
            root: classes.root,
            barColorPrimary: classes.barColorPrimary,
            colorPrimary: classes.colorPrimary
          }}
          variant="determinate"
          value={50}
        />
      </div>
      <div className="rating-container">
        <p>2</p>
        <LinearProgress
          classes={{
            root: classes.root,
            barColorPrimary: classes.barColorPrimary,
            colorPrimary: classes.colorPrimary
          }}
          variant="determinate"
          value={50}
        />
      </div>
      <div className="rating-container">
        <p>1</p>
        <LinearProgress
          classes={{
            root: classes.root,
            barColorPrimary: classes.barColorPrimary,
            colorPrimary: classes.colorPrimary
          }}
          variant="determinate"
          value={50}
        />
      </div>
      <div>{handleReviews()}</div>
    </div>
  );
}
