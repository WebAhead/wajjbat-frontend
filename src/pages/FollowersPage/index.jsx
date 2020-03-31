import React, { useEffect, useState } from 'react';
import FollowersList from './components/FollowersList'
import './styles.scss';


export default function businessFollowers(props) {

    return ( 
        <div>
            <h1 className="h1">Fake data, untill retreiving from backend once done</h1>
            <div className="followers-list">
                <FollowersList />
            </div>
        </div>

    )

}