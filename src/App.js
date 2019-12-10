import React, { Component } from "react";
import "./App.scss";
import BusinessCard from "./components/BusinessCard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BusinessCard></BusinessCard>
      </div>
    );
  }
}

export default App;
