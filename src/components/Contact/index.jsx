import React from "react";
import style from '../BusinessDetails/BusinessDetails.module.scss';

export default function Contact({ email, phone }) {
  return (
    <div className={style['contact']}>
      <h2 className={style['contact-title']}>Contact</h2>

      <div className={style['contact-info']}>
        <div className={style['business-contact']}>
          <img className={style['icon']} src={require('../../assets/icons/email.svg')} alt="" />
          <span>{email}</span>
        </div>
        <div className={style['business-contact']}>
          <img className={style['icon']} src={require('../../assets/icons/phone.svg')} alt="" />
          <span>{phone}</span>
        </div>
      </div>
    </div>
  );
}
