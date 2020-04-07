import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import './styles.scss';
import ReviewCard from 'components/Cards/ReviewCard';

const endPointUrl = process.env.REACT_APP_API_URL;

function ProfilePage(props) {
  const [reviews, setReviews] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [err, setErr] = useState(null);
  const history = useHistory();
  useEffect(() => {
    axios
      .get(`${endPointUrl}/api/getUserReviews`, { withCredentials: 'true' })
      .then(res => {
        setReviews(res.data.reviews);
        setUserDetails({ ...res.data.userDetails });
      })
      .catch(error => {
        setErr(error);
        return error;
      });
  }, []);

  if (err) {
    if (err.response.status === 403) history.push('/signin');
  }

  if (!userDetails.firstName) {
    return (
      <div className="emptyBusinessDetails">
        <CircularProgress disableShrink />
      </div>
    );
  }

  return (
    <div>
      <div className="profile-container">
        <img src={userDetails.profilePic} alt="" />
        <p>{userDetails.lastName}</p>
        <p>{userDetails.firstName}</p>
      </div>
      {reviews.map(currentReview => (
        <ReviewCard
          active
          fullname={currentReview.businessname}
          review_body={currentReview.reviewbody}
          rating={currentReview.rating}
          dateCreated={currentReview.reviewdate}
        />
      ))}
    </div>
  );
}

export default ProfilePage;
