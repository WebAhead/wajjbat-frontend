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
    const [followed, setFollowed] = useState(false);
    const [followMessage, setFollowMessage] = useState('Follow');

    const followHanler = () => (followed) ? setFollowed(false): setFollowed(true) ;
    useEffect(()=> followed ? setFollowMessage('Unfollow') : setFollowMessage('Follow') 
        ,[followed]);

    useEffect(async ()=>{
        await axios.post(`${process.env.REACT_APP_API_URL}/api/`)
    })

    return (
        <div className={classes.root}>
            <IconButton onClick={followHanler} className={classes.iconButton}>
                <FormattedMessage id={followMessage} />
                {followed ? <HighlightOffIcon className={classes.addMargin} /> : <AddIcon className={classes.addMargin} />}
            </IconButton>
        </div>
    );
}
