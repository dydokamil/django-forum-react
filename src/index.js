import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { Provider } from "react-redux";
import ForumsList from "./components/forums";
import Thread from "./components/thread";
import Login from "./components/login_form";
import Navbar from "./components/navbar";
import Signup from "./components/signup";
import Forum from "./components/forum";
import promise from "redux-promise";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Navbar />
  </Provider>,
  document.getElementById("main-navbar")
);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/threads/:id/" component={Thread} />
          <Route path="/forums/:id" component={Forum} />
          <Route path="/forums" component={ForumsList} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/" component={ForumsList} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
