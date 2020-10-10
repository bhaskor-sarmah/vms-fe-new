import axios from "axios";
import {
  ERRORS_AUTH,
  SET_CURRENT_USER,
  USER_LOGOUT,
  SET_USER_LOADING,
} from "./types";
import setJWTToken from "../../security/setJWTToken";
import { dispatchAction } from "./globalDispatch";
import isDev from "../../utils/devDetect";

export const login = (LoginRequest) => {
  return (dispatch, getState) => {
    dispatch(dispatchAction(SET_USER_LOADING, true));
    axios
      .post("/login", LoginRequest)
      .then((res) => {
        const { Token, UserDetails } = res.data;
        // store the token in the localStorage
        localStorage.setItem("jwtToken", Token);
        localStorage.setItem("userDetails", JSON.stringify(UserDetails));
        // set our token in axios header for future***
        setJWTToken(Token);

        // Creating a user object with the token
        const userDetails = {
          token: Token,
          user: UserDetails,
        };

        // dispatch to our securityReducer
        dispatch(dispatchAction(SET_CURRENT_USER, userDetails));
      })
      .catch((error) => {
        isDev() && console.log(error);
        dispatch(dispatchAction(SET_USER_LOADING, false));
        dispatch(dispatchAction(ERRORS_AUTH, "Invalid Credentials"));
      });
  };
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userDetails");
  setJWTToken(false);
  dispatch(dispatchAction(USER_LOGOUT, null));
};
