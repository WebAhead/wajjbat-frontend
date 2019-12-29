import React from "react";
import { Rating } from "@material-ui/lab";
import { FormattedMessage } from 'react-intl';
import style from "./BusinessCard.module.scss";

export default function BusinessCard({ business }) {
  return (
    <React.Fragment>
      <div className={style['business-card']}>
        <div className={style['business-img']}>
          <img src={business.image} alt="alt" />
        </div>
        <div className={style['business-content']}>
          <p className={style['business-name']}>{business.name}</p>
          <p className={style['business-description']}>{business.description}</p>
          <div className={style['business-bottom-content']}>
            <div className={style['business-type']}><FormattedMessage id={business.type} />, <FormattedMessage id={business.cuisine} /></div>
            <div className={style['business-rating']}>
              <Rating
                name="half-rating"
                value={business.rating}
                precision={0.5}
                readOnly
                size="small"
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
