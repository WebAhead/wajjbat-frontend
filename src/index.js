import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./theme/reset.scss";
import { IntlProvider } from "react-intl";
import messages from "./Languages";
const AppIndex = () => {
  const [lang, setLang] = useState("ar");
  useEffect(() => {
    setLang(lang);
  }, [lang]);

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <App lang={setLang} />
    </IntlProvider>
  );
};
ReactDOM.render(<AppIndex />, document.getElementById("root"));
