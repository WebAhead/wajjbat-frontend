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
import { red } from '@material-ui/core/colors';

import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

export default function BusinessDetails({ businessData, userPosition }) {
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
          <FormattedMessage id={businessData.type} />,{' '}
          <FormattedMessage id={businessData.cuisine} />
        </div>

        <div className={style['business-rating']}>

        <AvatarGroup max={3}>
        <Avatar alt="Remy Sharp" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" />
        <Avatar alt="Remy Sharp" src="https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687" />
        <Avatar alt="Remy Sharp" src="https://tinyjpg.com/images/social/website.jpg" />
        <Avatar alt="Remy Sharp" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" />
        <Avatar alt="Remy Sharp" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" />
        <Avatar alt="Remy Sharp" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" />
        <Avatar alt="Remy Sharp" src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" />
      </AvatarGroup>


        <Link to={{pathname: `/followers/${businessData.id}`}}
        >
          <div className={style['followers-by-business']}>
          <GroupIcon 
          style={{ color: '#21b5a2',}}
          fontSize="small" />
          <span className={style['followers-amount']} >
          <FormattedMessage 
          id='business followers' 
          values={{ followers: 15 }}
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
    </div>
  );
}
