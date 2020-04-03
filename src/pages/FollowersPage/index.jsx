import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import FollowersList from './components/FollowersList'
import './styles.scss';

const endPointUrl = process.env.REACT_APP_API_URL;

export default (props) => {
    
    const [businessFollowersData, setBusinessFollowersData] = useState(null);
    const businessid = props.match.params.businessid;

    useEffect(() => {
        (async function getFollowers() {
            try {
                const { data } = await axios.get(`${endPointUrl}/api/followers/${businessid}`);
                setBusinessFollowersData(data.followers);                              
            }
            catch (error) {
                console.log(error);
            }
        }());
    },[])

    if(!businessFollowersData){
        return (
            <div className="emptyBusinessDetails">
                <CircularProgress disableShrink />
            </div>
        );
    }

    return ( 
        <div> 

            <div className="business-profile-container">
                <img src="https://media.istockphoto.com/photos/chicken-wrap-picture-id888366454?k=6&m=888366454&s=612x612&w=0&h=P0w-97Q5ljBt4Wztx30JCbiqayHIgne8Hw95-M8MQZE=" alt="reviewer profile" />
                <div className="business-profile-container-headers">
                    <h1>Followers List</h1>
                    <h2>Al-Shawarma</h2>
                </div>
            </div>

            <div className="followers-list">
                <FollowersList 
                    businessFollowersData={businessFollowersData}
                />
            </div>
        </div>
    )
}