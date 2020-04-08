/* eslint-disable no-lonely-if */
import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import axios from 'axios';
import './style.scss';

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            'color': '#32325d',
            'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
            'fontSmoothing': 'antialiased',
            'fontSize': '16px',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    },
};

function stripeTokenHandler(token, business, clicks) {
    const paymentData = {token: token.id};
  
    // Use fetch to send the token ID and any other payment data to your server.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    axios.post(`${process.env.REACT_APP_API_URL}/payment/pay`, {
        paymentData,
        business,
        clicks
    })
        .then(response => {
            alert('Payment request to server succeeded');
            window.location.href = '/profile-business-list';
        })
        .catch(err => {
            alert('Payment request to server failed');
            console.log(err);
        });
}

export default function CheckoutForm(props) {
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async (event) => {
        event.preventDefault();
  
        if (!stripe || !elements) {
        // disable form submission until Stripe has loaded
            return;
        }
  
        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card);
  
        if (result.error) {
            console.log(result.error.message);
        } else {
            console.log(stripeTokenHandler(result.token, props.business, props.clicks));
        }
    };
  
    return (
        <form onSubmit={handleSubmit} className="paymentForm">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
            <button className="confirmOrderButton" disabled={!stripe}>
                Confirm Order
            </button>
        </form>
    );
}