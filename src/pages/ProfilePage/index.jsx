import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
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
            .then((res) => {
                setReviews(res.data.reviews);
                setUserDetails({ ...res.data.userDetails });
            })
            .catch((error) => {
                setErr(error);
                return error;
            });
    }, []);

    if (err) {
        if (err.response.status === 403) history.push('/signin');
    }

    if (!userDetails.firstName) {
        return 'Loading...';
    }

    return (
        <div>
            <div className="navbar-container">
                <button className="navButton">
                    <Link to="/profile">
                        <FormattedMessage id="Profile" />
                    </Link>
                </button>

                <button className="navButton">
                    <Link to="/profile-business-list">
                        <FormattedMessage id="Business" />
                    </Link>
                </button>
            </div>
            <div className="profile-container">
                <img src={userDetails.profilePic} alt="" />
                <p>{userDetails.lastName}</p>
                <p>{userDetails.firstName}</p>
            </div>
            {reviews.map((currentReview) => (
                <ReviewCard
                    fullname={currentReview.businessname}
                    rating={currentReview.rating}
                    review_body={currentReview.reviewbody}
                    dateCreated={currentReview.reviewdate}
                    disableLink
                />
            ))}
        </div>
    );
}

export default ProfilePage;
