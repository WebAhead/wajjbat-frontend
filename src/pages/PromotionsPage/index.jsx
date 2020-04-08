import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import './style.scss';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/Payment';


const endPointUrl = process.env.REACT_APP_API_URL;

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PromotionsPage = props => {
    const history = useHistory();
    const business = props.match.params.id || props.id;
    const [selected, setSelected] = React.useState(100);
    const [paymentPage, setPaymentPage] = React.useState(false);

    return (
        <div className="promotionsPage">
            {
                (paymentPage)
                    ? (
                        <>
                            <span className="promotionsTitle">
                                <FormattedMessage id="checkout" />
                            </span>

                            <Elements stripe={stripePromise}>
                                <CheckoutForm 
                                    business={business}
                                    clicks={selected}
                                />
                            </Elements>

                            <a className="cancelButton" onClick={() => setPaymentPage(false)}>
                                <FormattedMessage id="cancel" />
                            </a>
                        </>
                    ) : (
                        <>
                            <span className="promotionsTitle">
                                <FormattedMessage id="purchaseClicks" />
                            </span>
                            <div 
                                onClick={() => setSelected(10)}
                                onKeyDown={() => {}}
                                className={`clicksOption ${ selected === 10 ? 'selected' : ''}`}
                            >
                                <span className="numOfClicks">10</span>
                                <FormattedMessage id="bronze" />
                            </div>
                            <div 
                                onClick={() => setSelected(100)}
                                onKeyDown={() => {}}
                                className={`clicksOption ${ selected === 100 ? 'selected' : ''}`}
                            >
                                <span className="numOfClicks">100</span>
                                <FormattedMessage id="silver" />
                            </div>
                            <div 
                                onClick={() => setSelected(1000)}
                                onKeyDown={() => {}}
                                className={`clicksOption ${ selected === 1000 ? 'selected' : ''}`}
                            >
                                <span className="numOfClicks">1000</span>
                                <FormattedMessage id="gold" />
                            </div>
                            <button onClick={() => setPaymentPage(true)} className="checkoutButton">
                                <FormattedMessage id="checkout" />
                            </button>
                        </>
                    )
            }
        </div>
    );
}

export default injectIntl(PromotionsPage);
