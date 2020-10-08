import axios from "axios";
import { GET_AUTH_ERRORS, SET_CURRENT_USER, SET_USER_LOADING } from "./types";
import setJWTToken from "../../security/setJWTToken";
import { dispatchAction } from "./globalDispatch";

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
        dispatch(setCurrentUser(userDetails));
      })
      .catch((error) => {
        dispatch(
          dispatchAction(GET_AUTH_ERRORS, { error: "Invalid Credentials" })
        );
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

const setCurrentUser = (userDetails) => {
  return {
    type: SET_CURRENT_USER,
    payload: userDetails,
  };
};
