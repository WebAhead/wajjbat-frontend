import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/Home';
import BusinessPage from './pages/BusinessPage';
import NavBar from './components/NavBar';
import Signin from './pages/Signin/index';
import ProfilePage from './pages/ProfilePage/index';
import AddBusiness from './pages/AddBusiness';
import ProfileBusinesList from './pages/ProfileBusinessList';
import ReviewerPage from './pages/ReviewerPage';
import FollowersPage from './pages/FollowersPage';
import SearchResults from './pages/SearchResults';
import PromotionsPage from './pages/PromotionsPage';

import './App.scss';

export default (props) => {
    const [lang, setLang] = useState('en');
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        async function initPage() {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/isLoggedIn`,
                    {
                        withCredentials: true,
                    },
                );

                if (data.id) setLogged(true);
                return 1;
            } catch (error) {
                console.log(error);
                return 1;
            }
        }
        initPage();
    }, []);

    useEffect(() => {
        async function getLang() {
            const currentLang = localStorage.getItem('language') || lang;
            setLang(currentLang);
        }
        getLang();
    }, [lang]);

    return (
        <div className="App">
            <NavBar setLang={props.setLang} />
            <Switch className="App">
                <Route
                    path="/business/:id"
                    component={({ ...props }) => (
                        <BusinessPage logged={logged} {...props} />
                    )}
                />
                <Route exact path="/" render={() => <HomePage {...props} />} />
                <Route path="/signin" component={Signin} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/profile-business-list" component={ProfileBusinesList} />
                <Route path="/create-business" component={AddBusiness} />
                <Route
                    path="/reviewer/:fullname/:reviewerid"
                    component={ReviewerPage}
                />
                <Route path="/followers/:businessid" component={FollowersPage} />
                <Route path="/search" component={SearchResults} />
                <Route path="/promotions/:id" component={PromotionsPage} />
            </Switch>
        </div>
    );
};
