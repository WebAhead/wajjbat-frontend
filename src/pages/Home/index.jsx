import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import './style.scss';

import SliderContainer from 'components/Slider';
import BusinessesMap from 'components/BusinessesMap'
import Footer from 'components/Footer';
import BusinessSlide from './components/BusinessSlide';

const endPointUrl = process.env.REACT_APP_API_URL;

export default function Homepage(props) {
    const [businesses, setBusinesses] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [userPosition, setUserPosition] = useState({});
    const [originalBusinesses, setOriginalBusinesses] = useState([]);
    const [type, setTypeFilter] = useState('All');
    const [cuisine, setCusineFilter] = useState('All');
    const [radius, setRadiusFilter] = useState(null);
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
            <SliderContainer
                data={topRated}
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
                title="topRated"
            />
            {(userPosition.lat && businesses.length) ? (
                <BusinessesMap
                    businesses={searchData.length === 0 ? businesses : searchData}
                    userPosition={userPosition}
                    history={history}
                    setSearchData={setSearchData}
                    originalBusinesses={businesses}
                    radius={radius}
                />
            ): ''}
            <Footer
                lang={props.lang}
                filterByType={({ value }) => setTypeFilter(value)}
                filterByCuisine={({ value }) => setCusineFilter(value)}
                filterByRadius={({ value }) => setRadiusFilter(value)}
            />
        </div>
    );
}
