import React from 'react';
import { FormattedMessage } from 'react-intl';
import style from '../BusinessDetails/BusinessDetails.module.scss';

export default ({ email, phone }) => (
    <div className={style.contact}>
        <h2 className={style['contact-title']}>
            <FormattedMessage id="Contact us" />
        </h2>

        <div className={style['contact-info']}>
            <div className={style['business-contact']}>
                <img
                    className={style.icon}
                    src={require('../../../../assets/icons/email.svg')}
                    alt=""
                />
                <span>{email}</span>
            </div>
            <div className={style['business-contact']}>
                <img
                    className={style.icon}
                    src={require('../../../../assets/icons/phone.svg')}
                    alt=""
                />
                <span>{phone}</span>
            </div>
        </div>
    </div>
);
