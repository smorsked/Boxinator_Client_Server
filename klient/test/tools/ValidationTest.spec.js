const assert = require("chai").assert;
const ValidationToolBox = require("../../src/tools/ValidationToolBox");
let tools = new ValidationToolBox();

let isNumericLong = (result = tools.isNumeric("123"));
let isNumericCorrupt = (result = tools.isNumeric("1b3"));
let isNumericEmpty = (result = tools.isNumeric(""));

describe("ValidationToolBox", function() {
  describe("isNumeric()", function() {
    it("isNumeric should return true", function() {
      assert.equal(isNumericLong, true);
    });
    it("isNumeric should return false", function() {
      assert.equal(isNumericCorrupt, false);
    });

    it("isNumeric should return type boolean", function() {
      assert.typeOf(isNumericEmpty, "boolean");
    });
  });

  let isBlueGreenZone = tools.isBlue("#00ff1a");
  let isBlueEdgeCaseTurkoiseGreen = tools.isBlue("#00fffe");
  let isBlueEdgeCaseTurkoise = tools.isBlue("#00ffff");
  let isBlueEdgeCaseTurkoiseBlue = tools.isBlue("#00feff");
  let isBlueBlue = tools.isBlue("#0000ff");
  let isBlueEdgeCasePurpleBlue = tools.isBlue("#7e00ff");
  let isBlueEdgeCasePurple = tools.isBlue("#7f00ff");
  let isBlueEdgeCasePurpleRed = tools.isBlue("#8000ff");
  let isBlueRed = tools.isBlue("#ffeeee");

  describe("isBlue()", function() {
    it("isBlue should be in the green area and return false", function() {
      assert.equal(isBlueGreenZone, false);
    });
    it("isBlue should be on the green edge of turkoise and return false", function() {
      assert.equal(isBlueEdgeCaseTurkoiseGreen, false);
    });
    it("isBlue should be on the actual edge of turkoise and return false", function() {
      assert.equal(isBlueEdgeCaseTurkoise, false);
    });
    it("isBlue should be on the blue edge of turkoise and return true", function() {
      assert.equal(isBlueEdgeCaseTurkoiseBlue, true);
    });
    it("isNumeric is in the blue area and should return true", function() {
      assert.equal(isBlueBlue, true);
    });
    it("isBlue should be on the blue edge of purple and return true", function() {
      assert.equal(isBlueEdgeCasePurpleBlue, true);
    });
    it("isBlue should be on the actual edge of purple and return true", function() {
      assert.equal(isBlueEdgeCasePurple, true);
    });
    it("isBlue should be on the red edge of purple and return false", function() {
      assert.equal(isBlueEdgeCasePurpleRed, false);
    });
    it("isBlue should be in the red area and return false", function() {
      assert.equal(isBlueRed, false);
    });
  });

  let isHexCorrupt = tools.isHex("#f4cxxx10");
  let isHexEmpty = tools.isHex("");
  let isHexOnlyHex = tools.isHex("#f4a5d6");
  let isHexOnlyCorrupt = tools.isHex("#öäåpo*");
  let isHexUndefined = tools.isHex(undefined);

  describe("isHex()", function() {
    it("isHex is corrupted with bad characters and should return false", function() {
      assert.equal(isHexCorrupt, false);
    });
    it("isHex is empty and should return false", function() {
      assert.equal(isHexEmpty, false);
    });
    it("isNumeric is regular hex and should return true", function() {
      assert.equal(isHexOnlyHex, true);
    });
    it("isHex is entirelycorrupted with bad characters and should return false", function() {
      assert.equal(isHexOnlyCorrupt, false);
    });
    it("isHex is undefinesd and should return true", function() {
      assert.equal(isHexUndefined, false);
    });
  });

  let isColorCorrupt = tools.isColor("#f4cxxx10");
  let isColorStandard = tools.isColor("#c4c4c4");
  let isColorUndefined = tools.isColor(undefined);
  let isColorLong = tools.isColor("#c4c4c4c4c4");
  let isColorShort = tools.isColor("#c4c");
  let isColorEmpty = tools.isColor("");

  describe("isColor()", function() {
    it("isColor is corrupted with bad characters and should return false", function() {
      assert.equal(isColorCorrupt, false);
    });
    it("isColor is typical and should return true", function() {
      assert.equal(isColorStandard, true);
    });
    it("isColor is undefined and should return false", function() {
      assert.equal(isColorUndefined, false);
    });
    it("isColor is too long and should return false", function() {
      assert.equal(isColorLong, false);
    });
    it("isColor is too short and should return false", function() {
      assert.equal(isColorShort, false);
    });
    it("isColor is empty and should return false", function() {
      assert.equal(isColorEmpty, false);
    });
  });

  let destinations = [
    {
      countryCode: "au",
      name: "Australia",
      priceMultiplier: 7.2
    },
    {
      countryCode: "br",
      name: "Brazil",
      priceMultiplier: 8.6
    },
    {
      countryCode: "cn",
      name: "China",
      priceMultiplier: 4
    },
    {
      countryCode: "se",
      name: "Sweden",
      priceMultiplier: 1.3
    }
  ];
  let ValidDestTypical = tools.validateDestination("au", destinations);
  let ValidDestshort = tools.validateDestination("a", destinations);
  let ValidDestLong = tools.validateDestination("auu", destinations);
  let ValidDestUndefined = tools.validateDestination(undefined, destinations);
  let ValidDestCorrupt = tools.validateDestination("ax", destinations);

  describe("validateDestination()", function() {
    it("validateDestination is typical and should return true", function() {
      assert.equal(ValidDestTypical, true);
    });
    it("validateDestination is shorter than expected and should return false", function() {
      assert.equal(ValidDestshort, false);
    });
    it("validateDestination is longer than expected and should return false", function() {
      assert.equal(ValidDestLong, false);
    });
    it("validateDestination is undefined and should return false", function() {
      assert.equal(ValidDestUndefined, false);
    });
    it("validateDestination is corrupt and should return false", function() {
      assert.equal(ValidDestCorrupt, false);
    });
  });

  let isValidDestTypical = {
    countryCode: "se",
    name: "Sweden",
    priceMultiplier: 1.3
  };
  let isValidDestshort = {
    countryCode: "s",
    name: "Swen",
    priceMultiplier: 1.3
  };
  let isValidDestLong = {
    countryCode: "see",
    name: "Sweden",
    priceMultiplier: 1.3
  };
  let isValidDestUndefined = {
    name: "Sweden",
    priceMultiplier: 1.3
  };
  let isValidDestCorrupt = {
    countryCode: "sx",
    name: "Sweden",
    priceMultiplier: 1.3
  };

  describe("isvalidateDestination()", function() {
    it("isvalidateDestination is typical and should return true", function() {
      assert.equal(
        tools.isValidDestination(isValidDestTypical, destinations),
        true
      );
    });
    it("isvalidateDestination is shorter than expected and should return false", function() {
      assert.equal(
        tools.isValidDestination(isValidDestshort, destinations),
        false
      );
    });
    it("isvalidateDestination is longer than expected and should return false", function() {
      assert.equal(
        tools.isValidDestination(isValidDestLong, destinations),
        false
      );
    });
    it("isvalidateDestination is undefined and should return false", function() {
      assert.equal(
        tools.isValidDestination(isValidDestUndefined, destinations),
        false
      );
    });
    it("isvalidateDestination is corrupt and should return false", function() {
      assert.equal(
        tools.isValidDestination(isValidDestCorrupt, destinations),
        false
      );
    });
  });

  let validColorTypical = tools.validateColor("#ffff00");
  let validColorBlue = tools.validateColor("#0000ff");
  let validColorFormat = tools.validateColor("ffff00");
  let validColorUndefined = tools.validateColor(undefined);

  describe("validateColor()", function() {
    it("validateColor is yellow and should return true", function() {
      assert.equal(validColorTypical, true);
    });
    it("validateColor is blue and should return false", function() {
      assert.equal(validColorBlue, false);
    });
    it("validateColor is formated wrong and should return false", function() {
      assert.equal(validColorFormat, false);
    });
    it("validateColor is undefined and should return false", function() {
      assert.equal(validColorUndefined, false);
    });
  });

  let validateWeightZero = tools.validateWeight("0");
  let validateWeightNegative = tools.validateWeight("-5");
  let validateWeightLarge = tools.validateWeight("500000");
  let validateWeightTypical = tools.validateWeight("25");
  let validateWeightUndefined = tools.validateWeight(undefined);

  describe("validateWeight()", function() {
    it("validateWeight is zero and should return false", function() {
      assert.equal(validateWeightZero, false);
    });
    it("validateWeight is negative and should return false", function() {
      assert.equal(validateWeightNegative, false);
    });
    it("validateWeight is too large and should return false", function() {
      assert.equal(validateWeightLarge, false);
    });
    it("validateWeight is a typical weight and should return true", function() {
      assert.equal(validateWeightTypical, true);
    });
    it("validateWeight is undefined and should return false", function() {
      assert.equal(validateWeightUndefined, false);
    });
  });

  let validateNameShort = tools.validateName("a");
  let validateNamelong = tools.validateName(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  );
  let validateNameundefined = tools.validateName(undefined);
  let validateNameTypical = tools.validateName("vanligt namn123");

  describe("validateName()", function() {
    it("validateName is a short valid name and should return true", function() {
      assert.equal(validateNameShort, true);
    });
    it("validateName is a too long and should return false", function() {
      assert.equal(validateNamelong, false);
    });
    it("validateName is undefined and should return false", function() {
      assert.equal(validateNameundefined, false);
    });
    it("validateName is a shotypical valid name and should return true", function() {
      assert.equal(validateNameTypical, true);
    });
  });
});
