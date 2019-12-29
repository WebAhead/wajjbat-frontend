import React, { useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { Rating } from "@material-ui/lab";

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

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notReviewedYet, setNotReviewedYet] = useState(true)
  const [startReviewForm, setStartReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    reviewBody: '',
    rating: 0
  })

  const classes = useStyles();

  useEffect(() => {
    (async function isLoggedIn() {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/isLoggedIn`,
          { withCredentials: true }
        );
        if (data.id) {
          setIsLoggedIn(true)

          props.review_body((item) => {
            if (item.id === data.id) {
              setNotReviewedYet(false)
            }
          })
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [])

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
      {(!startReviewForm && !isLoggedIn) && (
        <div className="signin-card">
          <span>Log in to submit a review</span>
        </div>
      )}

      {(!startReviewForm && isLoggedIn) && (
        <div className="signin-card">
          <span style={{ fontSize: '22px' }}>How was {props.businessData.name} ?</span>
          <button className="submit-review-button" onClick={() => setStartReviewForm(true)}>Submit a review</button>
        </div>
      )}

      {startReviewForm && (
        <div className="signin-card">

          <Rating
            name="half-rating"
            size="large"
            value={reviewForm.rating}
            onChang={(event, value) => setReviewForm({ ...reviewForm, rating: value })}
          />
        </div>
      )}
      <div>{handleReviews()}</div>
    </div>
  );
}
