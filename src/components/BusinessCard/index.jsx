import React from "react";
import "./style.scss";

export default function BusinessCard({ business }) {
  return (
    <React.Fragment>
      <div className="business-card">
        <div className="business-img">
          <img
            src="https://images.unsplash.com/photo-1561222471-e96a96669d36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"
            alt="alt"
          />
        </div>
        <div className="business-content">
          <p className="business-name">business name</p>

          <p className="business-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, ea!
            Est, tempora. Quas, incidunt!
          </p>

          <div className="business-bottom-content">
            <div className="business-type">business type</div>
            {/* this will be replaced by Rating component */}
            <div className="business-rating">business rating</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
