import React, { useEffect, useState } from 'react';
import FollowersList from './components/FollowersList'
import './styles.scss';


export default function businessFollowers(props) {

    return ( 
        <div>
            <h1>Hello</h1>
            <div className="followers-list">
                <FollowersList />
            </div>
        </div>

    )

}