import React, { Fragment, Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/Home";

class App extends Component {
  render(props) {
    return (
      <Fragment>
        <Switch className="App">
          <Route
            exact
            path="/"
            render={props => <HomePage lang={this.props.lang} {...props} />}
          />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
