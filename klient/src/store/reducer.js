let ValidationToolBox = require("../tools/ValidationToolBox");
let tools = new ValidationToolBox();

const initialState = {
  name: "",
  weight: 0,
  color: "#ff0000",
  destination: [],
  destinations: [],
  progress: false,
  boxes: [],
  totalWeight: 0,
  totalPrice: 0,
  nameErrorText: "",
  weightErrorText: "",
  colorErrorText: "",
  destinationErrorText: "",
  saved: false,
  serverErrors: {
    name: false,
    weight: false,
    color: false,
    destination: false
  },
  lastLength: 0,
  errors: {
    nameErrors: {
      isEmpty: {
        status: true,
        errorText: "Empty feilds are not allowed, please enter a name"
      },
      isToLong: {
        status: false,
        errorText: "Name is too long, please enter a shorter name"
      }
    },
    weightErrors: {
      isZero: {
        status: false,
        errorText:
          "Only non-zero positive integers are acceptable as weights, please re-enter"
      },
      isNegative: {
        status: false,
        errorText: "Negative numbers are not allowed, please re-enter weight"
      },
      isEmpty: {
        status: true,
        errorText: "Empty feilds are not allowed, please enter weight"
      },
      isNumeric: {
        status: false,
        errorText:
          "Non mumeric caracters are not allowed. Allowed: (0-9) Not Allowed: (all other ex: -/&%¤#!()=?`^*abc..."
      },
      tooHeavy: {
        status: false,
        errorText:
          "Our shipping facility can only accept boxes with a total weight of up to 20 000 kg. Please enter a lighter box."
      }
    },
    colorErrors: {
      isBlue: {
        status: false,
        errorText: "Blue colors are not allowed, plese re-enter color"
      },
      isColor: {
        status: true,
        errorText:
          "The value of the colorpicker is not valid please enter another color"
      }
    },
    destinationerrors: {
      isProperDestination: {
        status: false,
        errorText:
          "The destination specified is not acceptable, please re-enter"
      }
    }
  }
};

const reducer = (state = initialState, action) => {
  const newState = { ...state }; // copy of state to moddify

  //--set states--
  if (action.type === "NUMBER_CHANGE") {
    if (!tools.isNumeric(action.text)) {
      document.getElementById("number").value = action.text.substring(
        0,
        action.text.length - newState.lastLength - action.text.length
      );
    } else {
      newState.weight = action.text;
      newState.lastLength = newState.weight.length;
    }
  }

  if (action.type === "COLOR_CHANGE") {
    newState.color = action.color;
  }

  if (action.type === "UPDATE_DESTINATIONS") {
    newState.destinations = action.data;
  }

  if (action.type === "SAVED") {
    newState.saved = action.value;
    return newState;
  }

  if (action.type === "CHANGE_DESTINATION") {
    if (action.data < 0 || action.data > 3) {
      newState.destination = [
        {
          countryCode: "invalid",
          name: "invalid",
          priceMultiplier: 1000
        }
      ];
    } else {
      newState.destination = newState.destinations[action.data];
    }
  }
  if (action.type === "RESET_INPUTS") {
    newState.name = "";
    newState.weight = 0;
    newState.color = "#ff0000";
    newState.destination = [];
    newState.colorErrorText = "";
    newState.nameErrorText = "";
    newState.weightErrorText = "";
    newState.destinationErrorText = "";
    newState.errors = initialState.errors;
  }

  if (action.type === "UPDATE_BOXES") {
    newState.boxes = action.data.boxes;
    newState.totalPrice = action.data.totalPrice;
    newState.totalWeight = action.data.totalWeight;
  }

  if (action.type === "NAME_CHANGE") {
    newState.name = action.data;
  }

  if (action.type === "NAME_SERVER_ERROR") {
    newState.serverErrors.name = action.value;
  }

  if (action.type === "WEIGHT_SERVER_ERROR") {
    newState.serverErrors.weight = action.value;
  }

  if (action.type === "COLOR_SERVER_ERROR") {
    newState.serverErrors.color = action.value;
  }

  if (action.type === "DESTINATION_SERVER_ERROR") {
    newState.serverErrors.destination = action.value;
  }
  //--Validation of form inputs--
  if (action.type === "VALIDATE_NAME") {
    let nameErrors = newState.errors.nameErrors;
    let name = newState.name;
    newState.nameErrorText = "";
    if (name.length < 1) {
      nameErrors.isEmpty.status = true;
      newState.nameErrorText += nameErrors.isEmpty.errorText;
    } else {
      nameErrors.isEmpty.status = initialState.errors.nameErrors.isEmpty.status;
    }
    if (name.length > 100) {
      nameErrors.isToLong.status = true;
      newState.nameErrorText += nameErrors.isToLong.errorText;
    } else {
      nameErrors.isToLong.status =
        initialState.errors.nameErrors.isToLong.status;
    }
  }

  if (action.type === "VALIDATE_WEIGHT") {
    let weightErrors = newState.errors.weightErrors;
    let initialError = initialState.errors.weightErrors;
    let weight = newState.weight;
    newState.weightErrorText = "";
    if (weight.length < 1) {
      weightErrors.isEmpty.status = true;
      newState.weightErrorText += weightErrors.isEmpty.errorText;
    } else {
      weightErrors.isEmpty.status = initialError.isEmpty.status;
    }
    if (!tools.isNumeric(weight)) {
      weightErrors.isNumeric.status = false;
      newState.weightErrorText += weightErrors.isNumeric.errorText;
    } else {
      weightErrors.isNumeric.status = initialError.isNumeric.status;
    }
    if (tools.isNumeric(weight) && parseInt(weight) < 0) {
      document.getElementById("number").text = "0";
      document.getElementById("number").value = "0";
      newState.weight = "0";
      weightErrors.isNegative.status = true;
      newState.weightErrorText += weightErrors.isNegative.errorText;
    } else {
      weightErrors.isNegative.status = initialError.isNegative.status;
    }
    if (tools.isNumeric(weight) && parseInt(weight) === 0) {
      weightErrors.isZero.status = true;
      newState.weightErrorText += weightErrors.isZero.errorText;
    } else {
      weightErrors.isZero.status = initialError.isZero.status;
    }

    if (tools.isNumeric(weight) && parseInt(weight) > 20000) {
      weightErrors.tooHeavy.status = true;
      newState.weightErrorText += weightErrors.tooHeavy.errorText;
    } else {
      weightErrors.tooHeavy.status = initialError.tooHeavy.status;
    }
  }

  if (action.type === "VALIDATE_COLOR") {
    let colorErrors = newState.errors.colorErrors;
    let color = newState.color;
    newState.colorErrorText = "";
    if (tools.isBlue(color)) {
      colorErrors.isBlue.status = true;
      newState.colorErrorText += colorErrors.isBlue.errorText;
    } else {
      colorErrors.isBlue.status = initialState.errors.colorErrors.isBlue.status;
    }
    if (!tools.isColor(color)) {
      colorErrors.isColor.status = false;
      newState.colorErrorText += colorErrors.isColor.errorText;
    } else {
      colorErrors.isColor.status =
        initialState.errors.colorErrors.isColor.status;
    }
  }

  if (action.type === "VALIDATE_DESTINATION") {
    let destinationErrors = newState.errors.destinationerrors;
    newState.destinationErrorText = "";
    if (
      !tools.isValidDestination(newState.destination, newState.destinations)
    ) {
      destinationErrors.status = false;
      newState.destinationErrorText +=
        destinationErrors.isProperDestination.errorText;
    } else {
      destinationErrors.isProperDestination.status =
        initialState.errors.destinationerrors.isProperDestination.status;
    }
  }
  newState.saved = false;
  return newState;
};

export default reducer;
