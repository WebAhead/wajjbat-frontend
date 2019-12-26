import React, { Fragment } from "react";
import "./style.scss";
export default function Select({ items, label, onSelect }) {
  return (
    <Fragment>
      <select required onChange={e => onSelect(e.target.value)}>
        <option disabled selected>
          {label}
        </option>
        {items.map(item => (
          <option key={item.id} name={item.value} value={item.name}>
            {item.value}
          </option>
        ))}
      </select>
    </Fragment>
  );
}
