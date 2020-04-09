import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss';
import { FormattedMessage } from 'react-intl';
import CircularProgress from '@material-ui/core/CircularProgress';

const endPointUrl = process.env.REACT_APP_API_URL;

export default (props) => {
    const [userFollowingData, setUserFollowingData] = useState(null);
    const userid = props.match.params.userid;

    useEffect(() => {
        async function getFollowing() {
            try {
                const { data } = await axios.get(`${endPointUrl}/api/following/${userid}`);
                setUserFollowingData(data.following);
            } catch (error) {
                console.log(error);
            }
        }
        getFollowing();
    }, []);

    if (!userFollowingData) {
        return (
            <div className="emptyUserFollowingDetails">
                <CircularProgress disableShrink />
            </div>
        );
    }

    const items = userFollowingData.map((item) => (
        <ul key={item.id}>
            <div className="following-businesses-container">
                <img src={item.primaryimage} alt="business profile" />
                <div className="following-businesses-container-headers">
                    <h2>{item.name}</h2>
                </div>
            </div>
        </ul>
    ));

    return (
        <div>
            <div>
                <div style={{fontSize: '25px', textAlign:'center', margin: '20px 0px'}}>
                    <FormattedMessage id="Following" />
                </div>
            </div>
      
            {items}
        </div>
    );
};
