import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import './style.scss';

const endPointUrl = process.env.REACT_APP_API_URL;

const PromotionsPage = props => {
    const history = useHistory();
    const business = props.id || props.match.params.id;

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
        </div>
    );
}

export default injectIntl(PromotionsPage);
