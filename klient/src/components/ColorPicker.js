import React, { Component } from "react";
import { connect } from "react-redux";

class ColorPicker extends Component {
  render() {
    return (
      <div id="input-wrapper">
        Color
        <br />
        <div
          style={{ backgroundColor: this.props.color }}
          className={this.props.valid}
        >
          <input
            id="picker"
            type="color"
            value={this.props.color}
            onBlur={this.props.onvalidate}
            onChange={this.props.onColorChange}
          />
        </div>
        <div className="errorText">{this.props.errors}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    valid: (!state.colorErrorText.length > 0) + "",
    color: state.color,
    errors: state.colorErrorText
  };
};
const mapDispachToProps = (dispatch, box) => {
  return {
    onColorChange: evt => {
      dispatch({ type: "COLOR_CHANGE", color: evt.target.value });
      dispatch({ type: "VALIDATE_COLOR" });
    },
    onvalidate: () => {
      dispatch({ type: "VALIDATE_COLOR" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(ColorPicker);
