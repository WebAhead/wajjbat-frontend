import React, { Fragment } from "react";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import "./style.scss";

const endPointUrl = process.env.REACT_APP_API_URL;
const facebookId = process.env.REACT_APP_FACEBOOK_ID;
const googleId = process.env.REACT_APP_GOOGLE_ID;

export default function Signin() {

  const responseFacebook = async response => {
    const { name, email, id } = response;
    const { url } = response.picture.data;

    try {
      await axios.post(endPointUrl + "/api/oauth/facebook", {
        name,
        email,
        id,
        url
      }, {
        withCredentials: true
      });
      window.location = "/";
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const responseGoogle = async response => {
    const { googleId: id, email, name, imageUrl: url } = response.profileObj;

    try {
      await axios.post(endPointUrl + "/api/oauth/google", {
        id,
        email,
        name,
        url
      });
      window.location = "/";
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Fragment>
      <div className="form-container">
        <h1 className="form-title">Signin</h1>
        <div className="signin-form">
          <form className="form-items">
            <FacebookLogin
              appId={facebookId}
              fields="name,email,picture"
              callback={responseFacebook}
              autoLoad={false}
              icon="fa-facebook"
            />
            <br />
            <br />
            <GoogleLogin
              clientId={googleId}
              buttonText="LOGIN WITH GOOGLE"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              autoLoad={false}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
}
