import React from "react";
import SliderContainer from "../../components/Slider";
import NavBar from "../../components/NavBar";
export default function Homepage(props) {
  return (
    <div>
      <h1>Hello world</h1>
      <NavBar lang={props.lang} />
      <SliderContainer />
    </div>
  );
}
