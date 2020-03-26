import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    },[])

    if(!reviewerDetails || !reviews){
        return <h2>Loading....</h2>
    }

    return (

        <div className="reviewer-container">
            <div className="profile-container">
                <img src={reviewerDetails.profile_image} alt="" />
                <div className="profile-container-headers">
                    <h2>{reviewerDetails.first_name} {reviewerDetails.last_name}</h2>
                    <h5>{reviewerDetails.email}</h5>
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
