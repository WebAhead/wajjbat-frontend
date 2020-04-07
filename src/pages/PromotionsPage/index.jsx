import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import './style.scss';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import PaymentForm from '../../components/Payment';

const endPointUrl = process.env.REACT_APP_API_URL;

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PromotionsPage = props => {
    const history = useHistory();
    const business = props.match.params.id;

    const goToPayment = (clicks) => {
        // take user to payment
        // object:
        // items: [arrayOfItems]
        // currency: >
        // 10: Bronze
        // 100: Silver
        // 1000: Gold
    };

    return (
        <div className="promotionsPage">
            <span className="promotionsTitle">
                <FormattedMessage id="purchaseClicks" />
            </span>
            <div 
                onClick={() => goToPayment(10)}
                onKeyDown={() => {}}
                className="clicksOption"
            >
                <span className="numOfClicks">10</span>
                <FormattedMessage id="bronze" />
            </div>
            <div 
                onClick={() => goToPayment(100)}
                onKeyDown={() => {}}
                className="clicksOption"
            >
                <span className="numOfClicks">100</span>
                <FormattedMessage id="silver" />
            </div>
            <div 
                onClick={() => goToPayment(1000)}
                onKeyDown={() => {}}
                className="clicksOption"
            >
                <span className="numOfClicks">1000</span>
                <FormattedMessage id="gold" />
            </div>
            <div>
                <Elements stripe={stripePromise}>

                    <PaymentForm />
                </Elements>
            </div>
        </div>
    );
}

export default injectIntl(PromotionsPage);
