import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import './style.scss';

import SearchBar from 'components/SearchBar';
import SliderContainer from 'components/Slider';
// import BusinessesList from 'components/BusinessesList';
import BusinessesMap from 'components/BusinessesMap'
import Footer from 'components/Footer';
import BusinessSlide from './components/BusinessSlide';

const endPointUrl = process.env.REACT_APP_API_URL;

export default function Homepage(props) {
    const [businesses, setBusinesses] = useState([]);
    const [sliderData, setSliderData] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [userPosition, setUserPosition] = useState({});
    const [originalBusinesses, setOriginalBusinesses] = useState([]);
    const [type, setTypeFilter] = useState('All');
    const [cuisine, setCusineFilter] = useState('All');
    const history = useHistory();
    useEffect(() => {
    // here we get the user location  after the user approve using
    // The HTML Geolocation API which is used to locate a user's position.
        if (navigator.geolocation) {
            setUserPosition({
                lat: 32.817216400,
                lng: 34.991226200
            });
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                setUserPosition({
                    lat: coords.latitude,
                    lng: coords.longitude
                });
            });
        }
    }, []);

    useEffect(() => {
        (async function getBusinesses() {
            // if user position hasnt been fetched yet then do not
            // get the list of businesses
            if (!userPosition.lng) {
                return;
            }

            try {
                const { data } = await axios.post(`${endPointUrl}/api/businesses`, {
                    lat: userPosition.lat,
                    lng: userPosition.lng,
                });
                
                setBusinesses(data.businesses);
                setOriginalBusinesses(data.businesses);
                setTopRated(data.topRated);
            } catch (error) {
                console.log(error);
            }
        }());
    }, [userPosition]);

    // if it's set to All then it's true which will keep the data
    // else actually filter it
    useEffect(() => setBusinesses(
        originalBusinesses.filter((business) => (business.type === type || type === 'All')
              && (business.cuisine === cuisine || cuisine === 'All')),
    ),
    [type, cuisine]);

    return (
        <div>
            <SearchBar
                businesses={businesses}
                setSliderData={setSliderData}
            />
            <SliderContainer
                data={sliderData.length === 0 ? topRated : sliderData}
                render={(business, index) => (
                    <Link
                        key={index}
                        to={{
                            pathname: `/business/${business.id}`,
                        }}
                    >
                        <BusinessSlide
                            key={index}
                            {...business}
                        />
                    </Link>
                )}
                // id for react-intl
                title={sliderData.length === 0 ? ('topRated') : ('searchResults')}
            />
            {(userPosition.lat && businesses.length) ? (
                <BusinessesMap
                    businesses={businesses}
                    userPosition={userPosition}
                    history={history}
                />
            ) : ''}
            <Footer
                lang={props.lang}
                filterByType={({ value }) => setTypeFilter(value)}
                filterByCuisine={({ value }) => setCusineFilter(value)}
            />
        </div>
    );
}
