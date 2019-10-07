import React, { Component } from "react";
import { connect } from "react-redux";

class NameInput extends Component {
  render() {
    return (
      <div id="input-wrapper">
        Name
        <br />
        <input
          className={this.props.valid}
          type="text"
          onBlur={() => {
            this.props.onvalidate();
          }}
          onChange={evt => {
            this.props.onNameChange(evt.target.value);
          }}
        />
        <div className="errorText">{this.props.errorText}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    valid: (!state.nameErrorText.length > 0) + "",
    name: state.name,
    errorText: state.nameErrorText,
    errors: state.errors.nameErrors
  };
};
const mapDispachToProps = dispatch => {
  return {
    onNameChange: name => {
      dispatch({ type: "NAME_CHANGE", data: name });
      dispatch({ type: "VALIDATE_NAME" });
    },
    onvalidate: () => {
      dispatch({ type: "VALIDATE_NAME" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(NameInput);
