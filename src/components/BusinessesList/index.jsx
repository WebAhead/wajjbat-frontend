import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BusinessCard from '../Cards/BusinessCard';
import BusinessPage from '../../pages/BusinessPage/index';
import './style.scss';
import { FormattedMessage } from 'react-intl';

export default ({ businesses, homeView, cardWidth }) => {
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  if (selectedBusiness) {
    return (
      <div className="selected-business-container">
        <div className="business-control-navbar">
          <button className="business-control-btn"> <FormattedMessage id='Edit'/></button>
          <button className="business-control-btn"><FormattedMessage id='Promotions'/></button>
          <button
            onClick={() => setSelectedBusiness(null)}
            className="business-control-back-btn"
          >
            <FormattedMessage id='Back'/>
          </button>
        </div>
        <BusinessPage match={{ params: { id: selectedBusiness } }} />
      </div>
    );
  }

  return (
    <>
      <div className="businesses-list">
        {businesses.map(business => (
          <div onClick={() => setSelectedBusiness(''+business.id)}>
            <BusinessCard
              business={business}
              homeView={homeView}
              cardWidth={cardWidth}
            />
          </div>
        ))}
      </div>
    </>
  );
};
