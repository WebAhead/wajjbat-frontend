import React from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import "./style.scss";

export default function index({ filterByTypeHandler, filterByCuisineHandler }) {
  return (
    <div className="filters">
      <h1 className="filterSectionTitle">Filter By </h1>

      <div className="filtersContainer">
        <div className="filterByBusinessTypeContainer">
          <p className="filterLabel">Business Type</p>

          <DropDownList
            className="filterByBusinessType"
            data={["All", "Restaurant", "Cafe", "Bars", "Store", "Other"]}
            defaultValue={["All"]}
            onChange={filterByTypeHandler}
          />
        </div>

        <div className="filterByCuisineTypeContainer">
          <p className="filterLabel">Cuisine Type</p>

          <DropDownList
            className="filterByCuisineType"
            data={[
              "All",
              "Italian",
              "Mexican",
              "Asian",
              "French",
              "Arabic",
              "Other"
            ]}
            defaultValue={["All"]}
            onChange={filterByCuisineHandler}
          />
        </div>
      </div>
    </div>
  );
}
