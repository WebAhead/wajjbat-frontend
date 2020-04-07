import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './theme/reset.scss';
import messages from './Languages';
import * as serviceWorker from './serviceWorker';

// payment addons
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);


const AppIndex = () => {
    const [lang, setLang] = useState('ar');
    useEffect(() => setLang(lang), [lang]);

    return (
        <IntlProvider locale={lang} messages={messages[lang]}>
            <BrowserRouter>
                <div style={{ direction: lang === 'ar' ? 'rtl' : 'ltr', fontFamily: 'Helvetica' }}>
                    <App setLang={setLang} lang={lang} />
                </div>
            </BrowserRouter>
        </IntlProvider>
    );
};

ReactDOM.render(<AppIndex />, document.getElementById('root'));
serviceWorker.register();