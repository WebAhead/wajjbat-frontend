import React, { Component } from "react";
import "./App.scss";
import "../src/pages/Home";
import HomePage from "../src/pages/Home";
class App extends Component {
  render(props) {
    return (
      <div className="App">
        <HomePage lang={this.props.lang} />
      </div>
    );
  }
}

export default App;
