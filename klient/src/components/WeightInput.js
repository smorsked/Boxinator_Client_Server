import React, { Component } from "react";
import { connect } from "react-redux";

class WeightInput extends Component {
  render() {
    return (
      <div id="input-wrapper">
        Weight
        <br />
        <input
          className={this.props.valid}
          id="number"
          type="text"
          onBlur={() => {
            this.props.onvalidate();
          }}
          onChange={this.props.onNumberChange}
        />
        <div className="errorText">{this.props.errors}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    valid: (!state.weightErrorText.length > 0) + "",
    weight: state.weight,
    errors: state.weightErrorText
  };
};
const mapDispachToProps = (dispatch, box) => {
  return {
    onNumberChange: evt => {
      dispatch({ type: "NUMBER_CHANGE", text: evt.target.value });
      dispatch({ type: "VALIDATE_WEIGHT" });
    },
    onvalidate: () => {
      dispatch({ type: "VALIDATE_WEIGHT" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(WeightInput);
