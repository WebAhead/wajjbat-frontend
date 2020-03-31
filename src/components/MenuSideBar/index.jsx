import React, { useEffect, useState } from 'react';
import Signin from 'pages/Signin';
import './style.scss';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';

export default function MenuSideBar({ setMenuShowSideBar, showMenuSideBar, logged, setLogged }) {
  const [hideProfile, setHideProfile] = useState(false);
  const history = useHistory();

  const menuSideBarHandler = () => {
    setMenuShowSideBar(!showMenuSideBar);
  };

  const handleUser = () => {
    console.log('inside handle user');
  };

  const handleProfile = () => {
    return history.push('/profile');
  };

  const handlebusinesses = () => {
    return history.push('/profile-business-list');
  };

  const handleLogout = () => {
    setLogged(false);
    const cookies = new Cookies();
    cookies.remove('wajjbat_access_token');
    history.push('/');
    console.log('after redirect');
  };

  return (
    <div
      className="main-sideBar"
      id="main-sideBar"
      style={{
        right: showMenuSideBar ? '0%' : '-100%'
      }}
    >
      <div className="overlay" onClick={menuSideBarHandler}>
        <div className="sideBar" id="sideBar" onClick={e => e.stopPropagation()}>
          <button className="sideBarHider" style={{ float: 'left' }} onClick={menuSideBarHandler}>
            ×
          </button>
          <div className="items">
            {!logged && (
              <div className="menuItem">
                <a href="/signin">sign in</a>
              </div>
            )}
            {logged && (
              <div className="menuItem">
                <a href="" onClick={handleProfile}>
                  profile
                </a>
              </div>
            )}
            {logged && (
              <div className="menuItem">
                <a href="" onClick={handlebusinesses}>
                  businesses
                </a>
              </div>
            )}
            {logged && (
              <div className="menuItem">
                <a href="" onClick={handleLogout}>
                  logout
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
