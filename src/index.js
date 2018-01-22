import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { Provider } from "react-redux";
import Forums from "./components/forums";
import promise from "redux-promise";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Forums />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
