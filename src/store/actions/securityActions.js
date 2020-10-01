import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, SET_USER_LOADING } from "./types";
import setJWTToken from "../../security/setJWTToken";
import isDev from "../../utils/devDetect";

export const login = (LoginRequest) => {
  return (dispatch, getState) => {
    dispatch(setUserLoading(true));
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
        dispatch(setCurrentUser(userDetails));
      })
      .catch((error) => {
        dispatch(getErrors(error));
      });
  };
};

export const logout = () => (dispatch) => {
  console.log("Logout Clicked");
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userDetails");
  setJWTToken(false);
  dispatch(setCurrentUser(null));
};

const setUserLoading = (payload) => {
  return {
    type: SET_USER_LOADING,
    payload: payload,
  };
};

const setCurrentUser = (userDetails) => {
  return {
    type: SET_CURRENT_USER,
    payload: userDetails,
  };
};

const getErrors = (error) => {
  if (isDev()) {
    // Log the error if in development mode
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  }
  return {
    type: GET_ERRORS,
    payload: { error: "Invalid Credentials" },
  };
};
