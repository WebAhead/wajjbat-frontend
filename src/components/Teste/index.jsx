import React from "react";
import { DropDownList, MultiSelect } from "@progress/kendo-react-dropdowns";
import "./style.scss";

export default function index({ filterByTypeHandler, filterByCuisineHandler }) {
  return (
    <div className="filters">
      <h1 className="filterSectionTitle">Filter By </h1>

      <p className="filterLabel">Business Type</p>

      <DropDownList
        className="filterByBusinessType"
        data={["All", "Restaurant", "Cafe", "Bars", "Store", "Other"]}
        defaultValue={["All"]}
        onChange={filterByTypeHandler}
      />
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
  );
}
