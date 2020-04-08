import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss';
import { FormattedMessage } from 'react-intl';
import CircularProgress from '@material-ui/core/CircularProgress';

const endPointUrl = process.env.REACT_APP_API_URL;

export default (props) => {
  const [userFollowingData, setUserFollowingData] = useState(null);

  const userid = props.match.params.userid;
  console.log('props: ', props);
  console.log('userid: ', userid);

  useEffect(() => {
    async function getFollowing() {
      try {
        const { data } = await axios.get(`${endPointUrl}/api/following/${userid}`);
        console.log('data back from API: ', data);
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
        No user data
      </div>
    );
  }

  return <div>Following Page for user: {userid}</div>;
};
