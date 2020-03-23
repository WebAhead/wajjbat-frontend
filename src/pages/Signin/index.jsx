import React from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { FormattedMessage, injectIntl } from 'react-intl';
import './style.scss';

const endPointUrl = process.env.REACT_APP_API_URL;
const facebookId = process.env.REACT_APP_FACEBOOK_ID;
const googleId = process.env.REACT_APP_GOOGLE_ID;

function Signin({ intl }) {
    const responseFacebook = async (response) => {
        if(!response.id) return;
        const { name, email, id } = response;
        const { url } = response.picture.data;

        try {
            await axios.post(`${endPointUrl }/api/oauth/facebook`, {
                name,
                email,
                id,
                url,
            }, {
                withCredentials: true,
            });
            window.location = '/';
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    const responseGoogle = async (response) => {
        if(!response.googleId) return;
        const { googleId: id, email, name, imageUrl: url } = response.profileObj;
        try {
            await axios.post(`${endPointUrl }/api/oauth/google`, {
                id,
                email,
                name,
                url,
            }, {
                withCredentials: true,
            });
            window.location = '/';
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    const googleMessage = intl.formatMessage({ id: 'Login with Google' })
    const facebookMessage = intl.formatMessage({ id: 'Login with Facebook' })

    return (
        <>
            <div className="form-container" style={{ marginTop:'15vh' }}>
                <h1 className="form-title"><FormattedMessage id="signin" /></h1>
                <div className="signin-form">
                    <form className="form-items">
                        <FacebookLogin
                            appId={facebookId}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            autoLoad={false}
                            disableMobileRedirect
                            icon="fa-facebook"
                            redirectUri={`${process.env.REACT_APP_URL}/signin`}
                            textButton={facebookMessage}
                        />
                        <br />
                        <br />
                        <GoogleLogin
                            clientId={googleId}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            autoLoad={false}
                            buttonText={googleMessage}
                        />
                    </form>
                </div>
            </div>
        </>
    );
}


export default injectIntl(Signin)
