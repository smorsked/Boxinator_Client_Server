import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreator from "../store/actions/actions";

class SelectDestination extends Component {
  componentDidMount() {
    this.props.onUpdateDestinations(); // load destination data from server
  }
  render() {
    return (
      <div id="input-wrapper">
        Destination
        <br />
        <select
          className={this.props.valid}
          onChange={this.props.onChangeDestination}
        >
          <option>-choose dest-</option>
          {this.props.destinations.map((dest, index) => {
            return (
              <option key={index} value={dest.countryCode}>
                {dest.name}
              </option>
            );
          })}
        </select>
        <div className="errorText">{this.props.errorText}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    valid: (!state.destinationErrorText.length > 0) + "",
    destination: state.destination,
    errorText: state.destinationErrorText,
    destinations: state.destinations
  };
};
const mapDispachToProps = dispatch => {
  return {
    onUpdateDestinations: () => {
      dispatch(actionCreator.updateDest());
    },
    onChangeDestination: evt => {
      dispatch({
        type: "CHANGE_DESTINATION",
        data: evt.target.selectedIndex - 1
      });
      dispatch({
        type: "VALIDATE_DESTINATION",
        data: evt.target.selectedIndex - 1
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(SelectDestination);
