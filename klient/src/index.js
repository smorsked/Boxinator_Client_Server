import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "./store/reducer";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ""}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
