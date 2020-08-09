import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import configureStore from "./configureStore";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const history = createBrowserHistory();
const initialState = window.INITIAL_REDUX_STATE;
const store = configureStore(history, initialState);

ReactDOM.render(
  <React.StrictMode>
    <App store={store} history={history} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
