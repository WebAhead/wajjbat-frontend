import React, { Component } from "react";
import "./App.scss";
import BusinessesList from "./components/BusinessesList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BusinessesList></BusinessesList>
      </div>
    );
  }
}

export default App;
