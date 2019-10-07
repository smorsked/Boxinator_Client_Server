import React, { Component } from "react";
import SaveButton from "./SaveButton";
import SelectDestination from "./SelectDestination";
import ColorPicker from "./ColorPicker";
import WeightInput from "./WeightInput";
import NameInput from "./NameInput";

class BoxForm extends Component {
  render() {
    return (
      <div className="App">
        <NameInput />
        <WeightInput />
        <ColorPicker />
        <SelectDestination />
        <SaveButton />
      </div>
    );
  }
}
export default BoxForm;
