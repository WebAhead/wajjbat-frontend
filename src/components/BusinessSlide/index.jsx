import React from "react";
import { Rating } from "@material-ui/lab";
import "./style.scss";
export default function BusinessSlide(props) {
  return (
    <div className="container">
      <img className="img" src={props.image} width={"100%"} />
      <h1 className="name">{props.name}</h1>
      <p className="description">{props.description}</p>
      <div className="type-rating-container">
        <h5 className="type">{props.type}</h5>
        <div className="rating">
          <Rating
            name="half-rating"
            value={props.rating}
            precision={0.5}
            readOnly
            size="small"
          />
        </div>
      </div>
    </div>
  );
}
