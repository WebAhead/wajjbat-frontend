import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import GroupIcon from '@material-ui/icons/Group';
import { FormattedMessage } from 'react-intl';
import style from './BusinessDetails.module.scss';
import PlaceFeature from '../PlaceFeature';
import Contact from '../Contact';
import BusinessPageMap from '../BusinessPageMap/index';
import Axios from 'axios';

export default function BusinessDetails({ businessData, userPosition }) {
    const [follow, setFollow] = React.useState(true);
    let user = true;
    //get if user
    //get if follows follow=true
    if (businessData === undefined) {
        return (
            <div className={style.emptyBusinessDetails}>
                <CircularProgress disableShrink />
            </div>
        );
    }
    async function followUnfollow() {
        if (follow)
            await Axios.post(`${process.env.REACT_APP_API_URL}/api/unfollow/`, { userId: 4, businessId: businessData.id })
        else
            await Axios.post(`${process.env.REACT_APP_API_URL}/api/follow/`, { userId: 4, businessId: businessData.id })
    }

    return (
        <div>
            <div className={style['upper-details-container']}>
                <div className={style['business-type']}>
                    <FormattedMessage id={businessData.type} />,{' '}
                    <FormattedMessage id={businessData.cuisine} />
                </div>

                <div className={style['business-rating']}>
                    {user ?
                        (<button type="submit" className="follow" onClick={followUnfollow} >
                            {follow ? "unfollow" : "follow"}
                        </button>) : ""}


                    <Link to={{ pathname: `/followers/${businessData.id}` }}>
                        <div className={style['followers-by-business']}>

                            <GroupIcon
                                style={{ color: '#21b5a2', }}
                                fontSize="small"
                            />

                            <span className={style['followers-amount']}>

                                <FormattedMessage
                                    id="business followers"
                                    values={{ followers: businessData.followers.count }}
                                />
                            </span>
                        </div>
                    </Link>

                    <Rating
                        name="half-rating"
                        value={+businessData.rating}
                        precision={0.5}
                        readOnly
                        size="small"
                    />
                </div>
            </div>

            <p className={style['business-name']}>{businessData.name}</p>
            <p className={style['business-description']}>
                {businessData.description}
            </p>

            <div className={style['place-features']}>
                <PlaceFeature
                    featureValue={businessData.smokingArea}
                    label="Smoking Area"
                />
                <PlaceFeature featureValue={businessData.parking} label="Parking" />
                <PlaceFeature featureValue={businessData.freeWifi} label="Free Wifi" />
            </div>

            <div className={style['contact-container']}>
                <Contact email={businessData.email} phone={businessData.phone} />
            </div>

            <div className={style.address}>
                <div className={style['business-address']}>{businessData.address}</div>
            </div>

            <BusinessPageMap
                userPosition={userPosition}
                businessPosition={{
                    lat: businessData.lat,
                    lng: businessData.lng,
                }}
            />
        </div >
    );
}
