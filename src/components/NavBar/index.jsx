import React, { useState, useEffect } from "react";
import "./style.scss";
import { FormattedMessage } from "react-intl";
export default function NavBar(props) {
  const [lang, setLang] = useState("ar");
  const handleLang = ({ target }) => setLang(target.value);
  useEffect(() => props.setLang(lang), [lang, props]);

  return (
    <div className="navBar">
      <div className="changeLanguage">
        <select className="select" onChange={handleLang} value={lang}>
          <option value="ar">ar</option>
          <option value="en">en</option>
        </select>
      </div>

      <div className="signUp">
        <FormattedMessage id="signup" />
      </div>
      <div className="login">
        <FormattedMessage id="signin" />
      </div>
    </div>
  );
}
