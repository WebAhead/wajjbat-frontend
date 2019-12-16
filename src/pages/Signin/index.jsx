import React, { Fragment } from "react";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import "./style.scss";
import "../../theme/utils.scss";

export default function Signin() {
  const responseFacebook = async response => {
    const { name, email, id } = response;
    const { url } = response.picture.data;

    try {
      await axios.post("http://192.168.0.71:8000/api/oauth/facebook", {
        name,
        email,
        id,
        url
      });
      window.location = "/";
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const responseGoogle = async response => {
    const { googleId: id, email, name, imageUrl: url } = response.profileObj;

    try {
      await axios.post("http://192.168.0.71:8000/api/oauth/google", {
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
              appId="565357740945087"
              fields="name,email,picture"
              callback={responseFacebook}
              autoLoad={false}
            />
            <br />
            <br />
            <GoogleLogin
              clientId="106689794615-k4jlefaset0m3i8l0eh9lfiff6i8s3gb.apps.googleusercontent.com"
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
