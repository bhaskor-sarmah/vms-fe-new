import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import isDev from "./utils/devDetect";
import axios from "axios";

/************************************
 ******* axios settings *************
 ************************************/

// Header is updated with JWT Token in the file setJWTToken.js

axios.defaults.baseURL = "http://localhost:9001";
axios.defaults.headers.post["Content-Type"] = "application/json";

if (isDev()) {
  // Request Interceptor
  axios.interceptors.request.use(
    (request) => {
      console.log(request);
      // Edit request config
      return request;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axios.interceptors.response.use(
    (response) => {
      console.log(response);
      // Edit response config
      return response;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
