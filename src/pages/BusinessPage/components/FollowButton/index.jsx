import React, {useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import {IconButton, makeStyles} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios'

const useStyles = makeStyles(() => ({
    root:{
        background:'none',
        textAlign: 'center'
    },
    iconButton:{
        'border': '2px solid #c4c4c4',
        'backgroundColor': 'transparent',
        'borderRadius': '6px',
        'width':'90%',
        '&:hover': {
            backgroundColor: 'transparent'
        },
    },
    addMargin:{
        margin: '0 10px'
    }
}));

export default function IconButtons() {

    const classes = useStyles();
    const [followed, setFollowed] = useState(null);
    const [followMessage, setFollowMessage] = useState('Follow');

    useEffect(async () => {
        try{ 
            const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/isfollowing`, { userId: 4, businessId: 1});
            setFollowed(data); 
        } catch(err){
            console.log(err);
        }
    },[])

    async function followUnfollow() {
        if (followed.success){
            const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/unfollow/`, { userId: 4, businessId: 1 })
            setFollowed(data.success); 
            setFollowMessage('Unfollow')}
        else{
            const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/api/follow/`, { userId: 4, businessId: 1 })
            setFollowed(data.success); 
            setFollowMessage('Follow')}
    }

    if(!followed){
        return <h1>Loading...</h1>
    }
 
    return (
        <div className={classes.root}>
            <IconButton onClick={followUnfollow} className={classes.iconButton}>
                <FormattedMessage id={followMessage} />
                {followed.success ? <HighlightOffIcon className={classes.addMargin} /> : <AddIcon className={classes.addMargin} />}
            </IconButton>
        </div>
    );
}
