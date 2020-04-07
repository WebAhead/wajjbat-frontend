import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import './style.scss';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import ExitToApp from '@material-ui/icons/ExitToApp';

export default function MenuSideBar({ setMenuShowSideBar, showMenuSideBar, logged, logout, lang, handleLang }) {
    const [hideProfile, setHideProfile] = useState(false);
    const history = useHistory();

    const menuSideBarHandler = () => {
        setMenuShowSideBar(!showMenuSideBar);
    };

    const handleProfile = () => {
        return history.push('/profile');
    };

    const handlebusinesses = () => {
        return history.push('/profile-business-list');
    };

    const handleLogout = () => {
        logout();
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
                                <a href="/signin">
                                    <FormattedMessage id="signin" />
                                </a>
                            </div>
                        )}
                        {logged && (
                            <div className="menuItem">
                                <a href="" onClick={handleProfile}>
                                    <FormattedMessage id="Profile" />
                                </a>
                            </div>
                        )}
                        {logged && (
                            <div className="menuItem">
                                <a href="" onClick={handlebusinesses}>
                                    <FormattedMessage id="Business" />
                                </a>
                            </div>
                        )}
                        <div className="menuItem">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a
                                href=""
                                style={{ color: lang === 'en' ? '#21b5a2' : '', fontSize: lang === 'en' ? '30px' : '' }}
                                value="en"
                                onClick={() => handleLang('en')}
                            >
                en
                            </a>{' '}
              /{' '}
                            <a href="" style={{ color: lang === 'ar' ? '#21b5a2' : '', fontSize: lang === 'ar' ? '30px' : '' }} onClick={() => handleLang('ar')}>
                ar
                            </a>
                        </div>
                        {logged && (
                            <div className="menuItem">
                                <div className="exit">
                                    <a href="" onClick={handleLogout}>
                                        <FormattedMessage id="Logout" />
                                    </a>
                                    <ExitToApp className="exit-icon" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
