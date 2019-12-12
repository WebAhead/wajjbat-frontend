import React, { useEffect, useState } from "react";
import "./style.scss";
export default function Footer() {
  const [hideFooter, setHideFooter] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);

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

  return (
    <div
      className="footer"
      id="footer"
      style={{ bottom: hideFooter ? "-70px" : "0" }}
    >
      <div className="filter" onClick={sideBarHandler}>
        <h1>Filter</h1>
      </div>
      <div className="separator"></div>
      <div className="sort">
        <h1>Sort</h1>
      </div>

      <div
        className="overlay"
        onClick={sideBarHandler}
        style={{ left: showSideBar ? "0px" : "-150%" }}
      >
        <div className="sideBar" id="sideBar">
          <button
            className="sideBarHider"
            style={{ float: "left" }}
            onClick={sideBarHandler}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
