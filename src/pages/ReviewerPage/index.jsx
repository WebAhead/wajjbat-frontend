import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReviewCard from 'components/Cards/ReviewCard'
import './style.scss';

const endPointUrl = process.env.REACT_APP_API_URL;

export default props => {
 
    const [reviewerDetails, setReviewerDetails] = useState(null);
    const [reviews, setReviewes] = useState(null);
 
    const reviewer = props.match.params.fullname.split(' ').join('-');
    const reviewerID = props.match.params.reviewerid;
 
    useEffect(() => {
        (async function getReviews() {
            try {
                const { data } = await axios.get(`${endPointUrl}/api/reviewer/${reviewer}/${reviewerID}`);
                setReviewerDetails(data.userDetails);
                setReviewes(data.reviews); 
            }
            catch (error) {
                console.log(error);
            }
        }());
    },[reviewer,reviewerID])

    if(!reviewerDetails || !reviews){
        return (
            <div className="emptyBusinessDetails">
                <CircularProgress disableShrink />
            </div>
        );
    }

    return (

        <div className="reviewer-container">
            <div className="profile-container">
                <img src={reviewerDetails[0].profile_image} alt="reviewer profile" />
                <div className="profile-container-headers">
                    <h2>{reviewerDetails[0].first_name} {reviewerDetails[0].last_name}</h2>
                    <h5>{reviewerDetails[0].email}</h5>
                </div>
            </div>
            <ul className="reviews-list">
                {reviews.map(review => {
                    let count = 0;
                    return (
                        <li key={++count}>
                            <ReviewCard 
                                active
                                fullname={review.businessname}
                                review_body={review.reviewbody}
                                rating={review.rating}
                                dateCreated={review.reviewdate}
                            />
                        </li>
                    )}
                )}
            </ul>
        </div>
    );
};
