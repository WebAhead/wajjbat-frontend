import React, { useState, useEffect } from "react";
import "./style.scss";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export default function NavBar(props) {
  const history = useHistory();
  const [lang, setLang] = useState("ar");
  const handleLang = ({ target }) => setLang(target.value);
  const handleUser = () => {
    if (document.cookie.indexOf('access_token') !== -1) return history.push("/profile");
    else return history.push("/signin");
  };
  useEffect(() => props.setLang(lang), [lang, props]);
  const useStyles = makeStyles({
    root: { color: "#21b5a2", height: "40px", width: "40px" }
  });
  const classes = useStyles();
  return (
    <div className="navBar">
      <div className="changeLanguage">
        <select className="select" onChange={handleLang} value={lang}>
          <option value="ar">ar</option>
          <option value="en">en</option>
        </select>
      </div>

      <div className="signUp">{/* <FormattedMessage id="signup" /> */}</div>
      <div className="login">
        {/* <FormattedMessage id="signin" />   */}
        <button
          onClick={() => {
            handleUser();
          }}
        >
          <AccountCircleIcon
            classes={{
              root: classes.root // class name, e.g. `classes-nesting-root-x`
            }}
          ></AccountCircleIcon>
        </button>
      </div>
    </div>
  );
}
