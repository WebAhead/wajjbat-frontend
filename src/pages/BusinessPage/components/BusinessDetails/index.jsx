import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import GroupIcon from '@material-ui/icons/Group';
import { FormattedMessage } from 'react-intl';
import style from './BusinessDetails.module.scss';
import PlaceFeature from '../PlaceFeature';
import FollowButton from '../FollowButton';
import Contact from '../Contact';
import BusinessPageMap from '../BusinessPageMap/index';

export default function BusinessDetails({ logged, businessData, userPosition, userid, businessId }) {
  if (businessData === undefined) {
    return (
      <div className={style.emptyBusinessDetails}>
        <CircularProgress disableShrink />
      </div>
    );
  }

  return (
    <div>
      <div className={style['upper-details-container']}>
        <div className={style['business-type']}>
          <FormattedMessage id={businessData.type} />, <FormattedMessage id={businessData.cuisine} />
        </div>

        <div className={style['business-rating']}>
          <div>
            <div className={style['followers-by-business']}>
              <Link
                to={{
                  pathname: `/followers/${businessData.id}`,
                  state: { businessData },
                }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <GroupIcon style={{ color: '#21b5a2' }} fontSize="small" />

                <span className={style['followers-amount']}>
                  <FormattedMessage id="business followers" values={{ followers: businessData.followers.count }} />
                </span>
              </Link>
              {logged ? (
                <div className={style['follow-btn']}>
                  <FollowButton userid={userid} businessId={businessId} />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>

          <Rating name="half-rating" value={+businessData.rating} precision={0.5} readOnly size="small" />
        </div>
      </div>

      <p className={style['business-name']}>{businessData.name}</p>
      <p className={style['business-description']}>{businessData.description}</p>

      <div className={style['place-features']}>
        <PlaceFeature featureValue={businessData.smokingarea} label="Smoking Area" />
        <PlaceFeature featureValue={businessData.parking} label="Parking" />
        <PlaceFeature featureValue={businessData.freewifi} label="Free Wifi" />
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
    </div>
  );
}
