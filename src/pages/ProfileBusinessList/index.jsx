import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import BusinessesList from "../../components/BusinessesList/index";
import "./style.scss";

const endPointUrl = process.env.REACT_APP_API_URL;
export default function ProfileBusinesList(props) {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    (async function getBusinesses() {
      const { data } = await axios.get(`${endPointUrl}/api/bussiness-list`, {
        withCredentials: true
      });

      setBusinesses(data);
    })();
  }, []);

  const handleAddBusiness = () => {
    window.location = "/create-business ";
  };

  return (
    <Fragment>
      <div className="navbar-container">
        <button>
          <Link to="/profile">
            <FormattedMessage id="Profile" />
          </Link>
        </button>

        <button>
          <Link to="/profile-business-list">
            <FormattedMessage id="Business" />
          </Link>
        </button>
      </div>
      <div className="profile-businesses-container">
        <div className="businesses-cards">
          <BusinessesList
            businesses={businesses}
            homeView={false}
            cardWidth="100%"
          />
        </div>
        <button className="add-business-btn" onClick={handleAddBusiness}>
          Add Business
        </button>
      </div>
    </Fragment>
  );
}
