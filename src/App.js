import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import "./assets/styles/App.css";
import Dashboard from "./components/layouts/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import PageNotFound from "./components/error/PageNotFound";
import { Login, ForgotPassword } from "./components/public";
import { SET_CURRENT_USER } from "./store/actions/types";
import { logout } from "./store/actions/securityActions";
import setJWTToken from "./security/setJWTToken";
import jwt_decode from "jwt-decode";
import { NotificationContainer } from "react-notifications";

function App(props) {
  let initialRoute = "/login";

  if (
    localStorage &&
    localStorage.getItem("jwtToken") &&
    localStorage.getItem("userDetails")
  ) {
    const jwtToken = localStorage.getItem("jwtToken");
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (jwtToken) {
      let decoded_jwtToken = null;
      try {
        decoded_jwtToken = jwt_decode(jwtToken);
      } catch (e) {
        console.log("Invalid JWT");
      }
      if (decoded_jwtToken) {
        setJWTToken(jwtToken); // Set JWT to axios header
        props.setCurrentUser({
          token: jwtToken,
          user: userDetails,
        });
        const currentTime = Date.now() / 1000;
        if (decoded_jwtToken.exp < currentTime) {
          props.logoutUser();
          window.location.href = "/";
        }
      }
    }
  }

  return (
    <Fragment>
      {/* <Notifier /> */}
      <NotificationContainer />
      <Switch>
        <PrivateRoute path={`/dashboard`} component={Dashboard} {...props} />
        <PublicRoute path='/login' component={Login} {...props} />
        <Route path='/forgot-password' component={ForgotPassword} />
        <Redirect from='/' to={initialRoute} />
        <Route component={PageNotFound} />
      </Switch>
    </Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (userdetails) =>
      dispatch({
        type: SET_CURRENT_USER,
        payload: userdetails,
      }),
    logoutUser: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(App);
