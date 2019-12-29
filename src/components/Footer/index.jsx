import React, { useEffect, useState } from "react";
import "./style.scss";
// import DropDownList  from "../../../node_modules/@progress/kendo-react-dropdowns";

import { DropDownList } from "@progress/kendo-react-dropdowns";
import Teste from "../Teste";

export default function Footer({ lang , filterByType,filterByCuisine}) {
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

  let sizes = ["X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large"];

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
          style={{ maxWidth: "40px" }}
        />
      </div>

      <div className="overlay" style={{ left: showSideBar ? "0px" : "-150%" }}>
        <div className="sideBar" id="sideBar">
          <button
            className="sideBarHider"
            style={{ float: "left" }}
            onClick={sideBarHandler}
          >
            ×
          </button>

          <div className="filterByType">
          
       
            <Teste filterByTypeHandler={filterByType}  filterByCuisineHandler ={filterByCuisine}/>


            
          </div>
        </div>
      </div>
    </div>
  );
}
