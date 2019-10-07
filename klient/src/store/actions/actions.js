export const updateDestAsnc = dest => {
  return { type: "UPDATE_DESTINATIONS", data: dest };
};

export const updateBoxesAsnc = boxes => {
  return { type: "UPDATE_BOXES", data: boxes };
};

export const updateDest = () => {
  return dispach => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/api/box/destinations", true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var resp = xhr.responseText;
          var respJson = JSON.parse(resp);
          return dispach(updateDestAsnc(respJson));
        }
      }
    };
  };
};

export const save = box => {
  return dispach => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/box/save", true);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(box));
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var resp = xhr.responseText;
          var respJson = JSON.parse(resp);
          if (
            respJson.status !== undefined &&
            respJson.status.localeCompare("success") === 0
          ) {
            dispach({ type: "SAVED", value: true });
          } else {
            promtInvalidInputs(JSON.parse(xhr.responseText).status, dispach);
          }

          return;
        }
      }
    };
  };
};

function promtInvalidInputs(inputCode, dispach) {
  dispach({
    type: "NAME_SERVER_ERROR",
    value: false
  });
  dispach({
    type: "WEIGHT_SERVER_ERROR",
    value: false
  });
  dispach({
    type: "COLOR_SERVER_ERROR",
    value: false
  });
  dispach({
    type: "DESTINATION_SERVER_ERROR",
    value: false
  });

  for (let i = 0; i < 4; i++) {
    if (inputCode[i] === "N") {
      dispach({
        type: "NAME_SERVER_ERROR",
        value: true
      });
    }
    if (inputCode[i] === "W") {
      dispach({
        type: "WEIGHT_SERVER_ERROR",
        value: true
      });
    }
    if (inputCode[i] === "C") {
      dispach({
        type: "COLOR_SERVER_ERROR",
        value: true
      });
    }
    if (inputCode[i] === "D") {
      dispach({
        type: "DESTINATION_SERVER_ERROR",
        value: true
      });
    }
  }
}

export const updateBoxes = () => {
  return dispach => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/api/box/list", true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var resp = xhr.responseText;
          var respJson = JSON.parse(resp);
          return dispach(updateBoxesAsnc(respJson));
        }
      }
    };
  };
};
