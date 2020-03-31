import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BusinessCard from '../Cards/BusinessCard';
import BusinessPage from '../../pages/BusinessPage';
import AddBusiness from '../../pages/AddBusiness';
import './style.scss';
import { FormattedMessage } from 'react-intl';

export default ({ businesses, homeView, cardWidth,selectedBusiness, setSelectedBusiness, editBusiness,setEditBusiness }) => {


    const handleBack = () => {
        if (editBusiness) setEditBusiness(null);
        else if (selectedBusiness) setSelectedBusiness(null);
      };

  if (selectedBusiness) {
    return (
      <div className="selected-business-container">
        <div className="business-control-navbar">
          <button
            onClick={() => setEditBusiness(true)}
            className="business-control-btn"
          >
            {' '}
            <FormattedMessage id="Edit" />
          </button>
          <button className="business-control-btn">
            <FormattedMessage id="Promotions" />
          </button>
          <button
            onClick={() => handleBack()}
            className="business-control-back-btn"
          >
            <FormattedMessage id="Back" />
          </button>
        </div>
       {editBusiness && <AddBusiness editing={selectedBusiness}/>}

        {!editBusiness && <BusinessPage match={{ params: { id: selectedBusiness.id } }} />}
      </div>
    );
  }

  return (
    <>
      <div className="businesses-list">
        {businesses.map(business => (
          <div onClick={() => setSelectedBusiness(business)}>
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
