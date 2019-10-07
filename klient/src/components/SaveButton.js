import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreator from "../store/actions/actions";

let ValidationToolBox = require("../tools/ValidationToolBox");
let tools = new ValidationToolBox();

class SaveButton extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.props.onUpdateSave(this.props.box, this.props.destArr);
          }}
        >
          save
        </button>
        <div className={this.props.saved} hidden={!this.props.hideSave}>
          <p>Saved box</p>
        </div>
        <div>
          <p className="errorText" hidden={!this.props.serverErrorBanner}>
            An error occured while uploading a box
          </p>
          <p className="errorText" hidden={!this.props.serverErrors.name}>
            The name is not recognized ny the server
          </p>
          <p className="errorText" hidden={!this.props.serverErrors.weight}>
            The weight is not valid
          </p>
          <p className="errorText" hidden={!this.props.serverErrors.color}>
            The color is not a valid color
          </p>
          <p
            className="errorText"
            hidden={!this.props.serverErrors.destination}
          >
            The destination is not a valid destination
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hideSave: state.saved,
    saved: state.saved + "Save",
    valid:
      !(
        state.serverErrors.name ||
        state.serverErrors.weight ||
        state.serverErrors.color ||
        state.serverErrors.destination
      ) + "",
    box: {
      name: state.name,
      weight: state.weight,
      color: state.color,
      destination: state.destination.countryCode
    },
    serverErrors: state.serverErrors,
    serverErrorBanner:
      state.serverErrors.name ||
      state.serverErrors.weight ||
      state.serverErrors.color ||
      state.serverErrors.destination,
    errorTexts: [
      state.nameErrorText,
      state.weightErrorText,
      state.colorErrorText,
      state.destinationErrorText
    ],
    destArr: state.destinations
  };
};

const mapDispachToProps = dispatch => {
  return {
    onUpdateSave: (boxData, destArr) => {
      dispatch({ type: "VALIDATE_NAME" });
      dispatch({ type: "VALIDATE_WEIGHT" });
      dispatch({ type: "VALIDATE_COLOR" });
      dispatch({ type: "VALIDATE_DESTINATION" });
      if (tools.validateSave(boxData, destArr)) {
        let finalBox = {
          name: boxData.name,
          weight: parseInt(boxData.weight),
          color: boxData.color,
          countryCode: boxData.destination
        };

        dispatch(actionCreator.save(finalBox));
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(SaveButton);
