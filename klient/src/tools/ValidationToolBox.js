function ValidationToolBox() {
  /*
  input type:
  string representation of RGB color in the folowing format: "#RRGGBB"
  where RR, GG, and BB respectivly represents hexadecimal numbers*/
  this.isBlue = function(stringColor) {
    let R = stringColor[1] + stringColor[2];
    let G = stringColor[3] + stringColor[4];
    let B = stringColor[5] + stringColor[6];

    //convert the string representation of hexadecimal numbers to integers in decimal
    R = parseInt("0x" + R);
    G = parseInt("0x" + G);
    B = parseInt("0x" + B);

    // subtract the least prominant color to RGB to get the proportional differance between the differant colors
    let min = Math.min(R, G, B);
    R = R - min;
    B = B - min;
    G = G - min;

    /*FYI I draw the boundary of wheter a color blue from a turquoise(R:0 G:255 B:255) all the way to purple(R:127 G:0 B:255).
    That is if the saturation is maxed out, and brightness is at 50%. The detemening factor is the *differance* in proportions between RGB,
    so the boundory in differential terms would be turquoise(R:0.0 G:1.0 B:1.0) all the way to purple(R:0.5 G:0.0 B:1.0). To get the difference
    in RGB I subtract the least prominant color from RGB to get the least prominat color to 0 and the remaining two in teh right proportions.*/
    //check if blue is the most prominant color
    if (B > G && B > R) {
      if (G < R) {
        if (R / B > 0.5) {
          return false;
        }
      }
      return true;
    }
    return false;
  };
  /*
  input type:
  String representation of a number*/
  this.isNumeric = function(stringNumber) {
    let myString = "" + stringNumber;
    let stringLength = myString.length;
    let template = "0123456789";

    for (let i = 0; i < stringLength; i++) {
      if (!template.includes(myString[i])) {
        return false;
      }
    }

    return true;
  };
  /*
  input type:
  String representation of a two digit hexadecimal number*/
  this.isHex = function(hexString) {
    if (hexString !== undefined) {
      // checks if all the characters (except for the "#") are from 0-f hex
      let template = "0123456789abcdef";
      if (hexString.length > 1) {
        for (let i = 1; i < hexString.length; i++) {
          if (!template.includes(hexString[i])) {
            return false;
          }
        }
        return true;
      }
    }

    return false;
  };
  /*
  input type:
  String representation of color*/
  this.isColor = function(stringColor) {
    if (stringColor !== undefined) {
      if (stringColor.length < 1) {
        return false;
      }
      if (stringColor.length > 7) {
        return false;
      }
      if (stringColor.length === 7) {
        if (stringColor[0] !== "#") {
          return false;
        }

        if (this.isHex(stringColor) === false) {
          return false;
        }
      } else {
        return false;
      }
      return true; // its a color!
    }
    return false;
  };
  /*
  Input types:
  destination = json object with the form {name: String, countryCode: String of size 2, priceMultiplier: float}
  destArr = array with destinations from database*/
  this.isValidDestination = function(dest, arrayDest) {
    if (dest !== undefined && arrayDest !== undefined) {
      for (let i = 0; i < arrayDest.length; i++) {
        if (
          arrayDest[i].countryCode !== undefined &&
          dest.countryCode !== undefined &&
          arrayDest[i].countryCode === dest.countryCode
        ) {
          return true;
        } else {
          continue;
        }
      }
    }
    return false;
  };
  /*
  Input types:
  destination = string of size 2(international country code)
  destArr = array with destinations from database*/
  this.validateDestination = function(destination, destArr) {
    if (destination !== undefined && destArr !== undefined) {
      for (let i = 0; i < destArr.length; i++) {
        if (destArr[i].countryCode === destination) {
          return true;
        } else {
          continue;
        }
      }
    }
    return false;
  };
  /*
  input type:
  String with valid color value of #RRGGBB*/
  this.validateColor = function(color) {
    if (color !== undefined) {
      if (!this.isBlue(color)) {
        if (this.isColor(color)) {
          return true;
        }
      }
    }

    return false;
  };
  /*
  input type:
  String (representing an integer)*/
  this.validateWeight = function(weight) {
    if (weight !== undefined) {
      if (weight !== undefined) {
        if (this.isNumeric(weight)) {
          if (parseInt(weight) > 0 && parseInt(weight) < 20000) {
            return true;
          }
        }
      }
    }

    return false;
  };
  /*
  inut type:
  String of arbitrairy size > 0*/
  this.validateName = function(name) {
    if (name !== undefined) {
      if (name !== undefined && name.length > 0 && name.length < 101) {
        return true;
      }
    }

    return false;
  };
  /* 
  input types: 
  box of type json with values as follows:
   name:string, weight:integer, color, String(#RRGGBB in hex), countryCode: xx(international countrycode) from database
  destArr of type array of arbitrairy size with elements of type json example:
   {name: String, weight: integer, color:String(#RRGGBB in hex), countryCode:String (international countrycode) from database}*/
  this.validateSave = function(box, destArr) {
    if (!this.validateName(box.name)) {
      return false;
    }
    if (!this.validateWeight(box.weight)) {
      return false;
    }
    if (!this.validateColor(box.color)) {
      return false;
    }
    if (!this.validateDestination(box.destination, destArr)) {
      return false;
    }
    return true;
  };
}

module.exports = ValidationToolBox;
