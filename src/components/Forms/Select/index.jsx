import React from 'react';
import './style.scss';

export default ({ items, label, onSelect, value }) => (
    <>
        <select value={value ||label} required onChange={(e) => onSelect(e.target.value)}>
            {/* <option disabled selected>
                {value || label}
            </option> */}
            {items.map((item) => (
                <option key={item.id} name={item.value} value={item.name}>
                    {item.value}
                </option>
            ))}
        </select>
    </>
)
