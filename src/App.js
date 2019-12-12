import React, { Fragment, Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import BusinessPage from "./pages/BusinessPage";
import NavBar from "./components/NavBar";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <Fragment>
        <NavBar />
        <Switch className="App">
          <Route path="/business/:id" component={BusinessPage} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
