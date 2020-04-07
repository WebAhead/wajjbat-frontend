import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import axios from 'axios';
import BusinessesList from 'components/BusinessesList/index';
import './style.scss';

const endPointUrl = process.env.REACT_APP_API_URL;
export default function ProfileBusinesList(props) {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [editBusiness, setEditBusiness] = useState(null);

  const history = useHistory();

  const handleNav = () => {
    setSelectedBusiness(null);
    setEditBusiness(null);
  };

  useEffect(() => {
    async function getBusinesses() {
      const { data } = await axios.get(`${endPointUrl}/api/business-list`, {
        withCredentials: true
      });

      setBusinesses(data);
    }
    getBusinesses();
  }, [editBusiness]);

  const handleAddBusiness = () => {
    window.location = '/create-business ';
  };

  return (
    <>
      <div className="profile-businesses-container">
        <div className="businesses-cards">
          <BusinessesList
            businesses={businesses}
            homeView={false}
            cardWidth="100%"
            selectedBusiness={selectedBusiness}
            setSelectedBusiness={setSelectedBusiness}
            editBusiness={editBusiness}
            setEditBusiness={setEditBusiness}
          />
        </div>
        {!selectedBusiness && (
          <button className="add-business-btn" onClick={handleAddBusiness}>
            <FormattedMessage id="Add Business" />
          </button>
        )}
      </div>
    </>
  );
}
