import React from 'react';
import axios from 'axios';
import { injectIntl } from 'react-intl';
import BusinessesList from 'components/BusinessesList';
import SearchBar from '../../components/SearchBar';
import './style.scss';

const endPointUrl = process.env.REACT_APP_API_URL;

const SearchResults = props => {
    const [searchData, setSearchData] = React.useState([]);
    const [businesses, setBusinesses] = React.useState([]);
    const [userPosition, setUserPosition] = React.useState({});

    React.useEffect(() => {
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

    React.useEffect(() => {
        (async () => {
            if (!userPosition.lng) {
                return;
            }

            try {
                const { data } = await axios.post(`${endPointUrl}/api/businesses`, {
                    lat: userPosition.lat,
                    lng: userPosition.lng,
                });
                
                setBusinesses(data.businesses);

            } catch (error) {
                console.log(error);
            }
        })()
    }, [userPosition]);


    return (
        <div className="search">
            <div className="searchWrapper">
                <SearchBar
                    businesses={businesses}
                    setSearchData={setSearchData}
                />
            </div>
            <BusinessesList
                businesses={searchData}
                cardWidth="90%"
            />
        </div>
    );
};

export default injectIntl(SearchResults);