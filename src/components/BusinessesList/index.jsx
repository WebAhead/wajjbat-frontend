import React from 'react';
import { Link } from 'react-router-dom';
import BusinessCard from '../Cards/BusinessCard';
import './style.scss';

export default ({ businesses, homeView, cardWidth }) => (
    <>
        <div className="businesses-list">
            {businesses.map((business) => (
                <Link
                    key={business.id}
                    to={{
                        pathname: `/business/${business.id}`,
                    }}
                >
                    <BusinessCard
                        business={business}
                        homeView={homeView}
                        cardWidth={cardWidth}
                    />
                </Link>
            ))}
        </div>
    </>
)
