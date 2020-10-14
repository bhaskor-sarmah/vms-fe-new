import axios from "axios";
import {
  SET_DRIVER_LOADING,
  GET_ALL_DRIVERS,
  ADD_DRIVER_LOADING,
  ADD_DRIVER,
  ERRORS_GET_ALL_DRIVERS,
  ERRORS_ADD_DRIVER,
  SET_NOTIFICATION,
} from "./types";
import { dispatchAction } from "./globalDispatch";
import isDev from "../../utils/devDetect";

export const getAllDrivers = () => {
  return (dispatch, getState) => {
    console.log("fired dispatch");
    dispatch(dispatchAction(SET_DRIVER_LOADING, true));
    axios
      .get("/common/userManagement/GetUserByRole/driver")
      .then((res) => {
        // console.log(res.data);
        dispatch(dispatchAction(GET_ALL_DRIVERS, res.data));
      })
      .catch((error) => {
        isDev() && console.log(error);
        dispatch(dispatchAction(SET_DRIVER_LOADING, false));
        dispatch(
          dispatchAction(ERRORS_GET_ALL_DRIVERS, "Error fetching driver list")
        );
      });
  };
};

export const addNewDrivers = (driverData) => {
  return (dispatch, getState) => {
    console.log("Adding New Driver");
    dispatch(dispatchAction(ADD_DRIVER_LOADING, true));
    axios
      .post("/admin/addUser", driverData)
      .then((res) => {
        console.log(res.data);
        if (!res.data.status) {
          throw new Error("Error Adding Driver");
        }
        dispatch(dispatchAction(ADD_DRIVER, res.data));
        dispatch(
          dispatchAction(SET_NOTIFICATION, "New Driver Added Successfully")
        );
      })
      .catch((error) => {
        isDev() && console.log(error);
        dispatch(dispatchAction(ADD_DRIVER_LOADING, false));
        dispatch(dispatchAction(ERRORS_ADD_DRIVER, "Error Adding Driver"));
      });
  };
};

export const resetAddDriverError = () => {
  return (dispatch, getState) => {
    dispatch({ type: ERRORS_ADD_DRIVER, payload: null });
  };
};
