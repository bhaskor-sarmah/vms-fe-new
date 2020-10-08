import axios from "axios";
import { SET_DRIVER_LOADING, GET_ALL_DRIVERS } from "./types";
import { dispatchAction } from "./globalDispatch";

export const getAllDrivers = () => {
  return (dispatch, getState) => {
    dispatch(dispatchAction(SET_DRIVER_LOADING, true));
    axios
      .get("/common/userManagement/GetUserByRole/driver")
      .then((res) => {
        console.log(res.data);
        // dispatch to our securityReducer
        dispatch(dispatchAction(GET_ALL_DRIVERS, res.data));
      })
      .catch((error) => {
        dispatch(dispatchAction(error));
      });
  };
};
