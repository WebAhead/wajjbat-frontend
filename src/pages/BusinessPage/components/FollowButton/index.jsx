import React, {useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import {IconButton, makeStyles} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios'

const useStyles = makeStyles(() => ({
    root:{
        'background':'none',
        'textAlign': 'center',
        'marginTop': '15px',
        'border': '2px solid #21b5a2',
        'backgroundColor': 'transparent',
        'color': '#21b5a2',
        'borderRadius': '5px',
        'fontSize': '16px',
        'padding': '4px 8px',
        'marginBottom': '-50px',
        'cursor': 'pointer'
    },
    addMargin:{
        margin: '5px 10px'
    }
}));

export default function IconButtons() {

    const classes = useStyles();
    const [follows, setFollows] = useState(null);

    useEffect(() => {
        async function checkIsFollowing() {
            try{ 
                const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/isfollowing`, { userId: 4, businessId: 1});
                setFollows(data.success);
            } catch(err){
                console.log(err);
            }
        }

        checkIsFollowing()
    },[])

    async function followUnfollow() {
        if (follows){
            setFollows(false);
            const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/unfollow/`, { userId: 4, businessId: 1 })
            
        } else {
            setFollows(true); 
            const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/follow/`, { userId: 4, businessId: 1 })
        }
    }
    return (
        <div className={classes.root} onClick={followUnfollow}>
            {follows 
                ? <FormattedMessage id="Unfollow" />
                : <FormattedMessage id="Follow" />}    
        </div>
    )
}