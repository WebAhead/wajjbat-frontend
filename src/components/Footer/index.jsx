import React, { useEffect, useState } from "react";
import "./style.scss";

import Filtering from "../Filtering";

export default function Footer({ lang, filterByType, filterByCuisine }) {
  const [hideFooter, setHideFooter] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  const sideBarHandler = () => {
    setShowSideBar(!showSideBar);
  };

  useEffect(() => {
    var prevScrollPosition = window.pageYOffset;
    window.onscroll = function() {
      var currentScrollPosition = window.pageYOffset;
      if (prevScrollPosition > currentScrollPosition) {
        setHideFooter(false);
      } else {
        setHideFooter(true);
      }
      prevScrollPosition = currentScrollPosition;
    };
  }, []);

  //we use this to help us move the filter button from left to rigth
  // according to the chosen language
  let ltrLang = lang === "en";

  return (
    <div
      className="footer"
      id="footer"
      style={{
        bottom: hideFooter ? "-100px" : "0",
        left: ltrLang ? "70%" : "0%"
      }}
    >
      <div className="filter" onClick={sideBarHandler}>
        <img
          className="filterIcon"
          src={require("./filterIcon.svg")}
          alt=""
          style={{ maxWidth: "30px" }}
        />
      </div>

      <div
        className="overlay"
        onClick={sideBarHandler}
        style={{ left: showSideBar ? "0px" : "-150%" }}
      >
        <div
          className="sideBar"
          id="sideBar"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="sideBarHider"
            style={{ float: "left" }}
            onClick={sideBarHandler}
          >
            ×
          </button>

          <Filtering
            filterByTypeHandler={filterByType}
            filterByCuisineHandler={filterByCuisine}
          />
        </div>
      </div>
    </div>
  );
}
