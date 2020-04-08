import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import FollowersList from './components/FollowersList'
import './styles.scss';

const endPointUrl = process.env.REACT_APP_API_URL;

export default (props) => {
    
    const [businessFollowersData, setBusinessFollowersData] = useState(null);
    const businessid = props.match.params.businessid;
    const businessData = props.location.state.businessData;  

    useEffect(() => {
        async function getFollowers() {
            try {
                const { data } = await axios.get(`${endPointUrl}/api/followers/${businessid}`);
                setBusinessFollowersData(data.followers);                              
            }
            catch (error) {
                console.log(error);
            }
        };
        getFollowers();
    },[businessid])

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
                <img src={businessData.image} alt="reviewer profile" />
                <div className="business-profile-container-headers">
                    <h2>{businessData.name}</h2>
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