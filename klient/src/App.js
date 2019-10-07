import React, { Component } from "react";
import "./App.css";
import { Route, Switch, HashRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import BoxTable from "./components/BoxTable";
import BoxForm from "./components/BoxForm";

class App extends Component {
  render() {
    return (
      <HashRouter basename="/">
        <div>
          <Link onClick={this.props.onReset} to="/addbox">
            Add Box
          </Link>
          <br />
          <Link onClick={this.props.onReset} to="/listboxes">
            List Boxes
          </Link>
          <Switch>
            <Route path="/addbox" component={BoxForm} />
            <Route path="/listboxes" component={BoxTable} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispachToProps = dispatch => {
  return {
    onReset: () => {
      dispatch({ type: "RESET_INPUTS" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(App);
