import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreator from "../store/actions/actions";

class BoxTable extends Component {
  componentDidMount() {
    this.props.onUpdateBoxes();
  }
  render() {
    return (
      <div>
        <h1>Shippling list</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Weight</th>
              <th>Color</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.props.boxes.map((box, index) => {
              return (
                <tr key={index}>
                  <td>{box.name}</td>
                  <td>{box.weight}</td>
                  <td style={{ backgroundColor: box.color }}></td>
                  <td>
                    {(
                      parseFloat(box.weight) *
                      parseFloat(box.destination.priceMultiplier)
                    ).toFixed(2)}
                  </td>
                </tr>
              );
            })}

            <tr id="summary">
              <td>totalweight </td>
              <td>{this.props.totalWeight.toFixed(2)}</td>
              <td>totalprice </td>
              <td>{this.props.totalPrice.toFixed(2)}</td>
              <td> </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    boxes: state.boxes,
    totalPrice: state.totalPrice,
    totalWeight: state.totalWeight
  };
};
const mapDispachToProps = dispatch => {
  return {
    onUpdateBoxes: () => dispatch(actionCreator.updateBoxes())
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(BoxTable);
