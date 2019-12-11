import React, { Fragment, Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch className="App">
          <Route exact path="/" component={Home} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
