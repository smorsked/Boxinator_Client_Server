import React, { Component } from "react";
import "./css/styles.css";
import { Route, Switch, HashRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import BoxTable from "./components/BoxTable";
import BoxForm from "./components/BoxForm";

class App extends Component {
  render() {
    return (
      <HashRouter basename="/">
        <div id="body">
          <div id="navigator">
            <Link className="link" onClick={this.props.onReset} to="/addbox">
              Add
            </Link>
            <Link className="link" onClick={this.props.onReset} to="/listboxes">
              List
            </Link>
            <div />
          </div>
          <div id="content">
            <Switch>
              <Route path="/addbox" component={BoxForm} />
              <Route path="/listboxes" component={BoxTable} />
            </Switch>
          </div>
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
