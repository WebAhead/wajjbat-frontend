import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss';

const endPointUrl = process.env.REACT_APP_API_URL;

export default (props) => {

    const [reviewerDetails, setReviewerDetails] = useState(null);
    const [reviews, setReviewes] = useState(null);
 
    const reviewer = props.location.state.reviewerName.split(' ').join('-');
    const reviewerID = props.location.state.reviewerId;
 
    useEffect(async () => {
        try {
            const { data } = await axios.get(`${endPointUrl}/api/reviewer/${reviewer}/${reviewerID}`)          
            setReviewerDetails(data.userDetails);
            setReviewes(data.reviews);
        } catch (error) {
            console.log(error);
        }
    },[])

    if(!reviewerDetails || !reviews){
        return <h2>Loading....</h2>
    }


    return (
        <div className="reviewer-container">

            <div className="reviewer-details">
                <img className="reviewer-pic" src={reviewerDetails.profile_image} alt="reviewer-pic" />
                <div className="name-email">
                    <h1>{reviewerDetails.first_name} {reviewerDetails.last_name}</h1>
                    <h3>{reviewerDetails.email}</h3>
                </div>
            </div>

            <ul className="reviews-list">
                {reviews.map(review => (
                    <li>
                        <h1>Date: {review.reviewdate}</h1>
                        <h1>Name: {review.businessname}</h1>                   
                        <h1>Body: {review.reviewbody}</h1>
                        <h1>Rating: {review.rating}</h1>
                    </li>
                )
                )}
            </ul>


        </div>
    );
};
