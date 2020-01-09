import React from "react";
import { FormattedMessage } from 'react-intl';

export default function PlaceFeature({ featureValue, label }) {
  // in the first two lies we use regular expression in order to split by camel case
  return (
    <div style={{ flexGrow: '1', marginBottom: '15px' }}>
      <div
        style={{
          color: featureValue ? "green" : "red"
        }}
      >
        <span style={{ color: 'black' }}><FormattedMessage id={label} /> </span>
        {featureValue ? "✔" : "✘"}
      </div>
    </div>
  );
}
