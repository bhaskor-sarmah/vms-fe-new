import axios from "axios";
import {
  ERRORS_GENERATE_TOKEN,
  GENERATE_TOKEN,
  GENERATE_TOKEN_LOADING,
  SET_LON_LAT_FROM,
  SET_LON_LAT_TO,
  SET_NOTIFICATION,
  SET_TRIP_DISTANCE,
  CREATE_TRIP_LOADING,
  CREATE_TRIP,
  ERRORS_CREATE_TRIP
} from "./types";
import { dispatchAction } from "./globalDispatch";
import isDev from "../../utils/devDetect";

export const setLatLngFrom = (data) => {
  return (dispatch, getState) => {
    dispatch(dispatchAction(SET_LON_LAT_FROM, data));
  };
};

export const setLatLngTo = (data) => {
  return (dispatch, getState) => {
    dispatch(dispatchAction(SET_LON_LAT_TO, data));
  };
};

export const setTripDistance = (dist) => {
  return (dispatch, getState) => {
    dist = dist / 1000;
    dispatch(dispatchAction(SET_TRIP_DISTANCE, dist));
  };
};

export const resetGeneratedToken = () => {
  return (dispatch, getState) => {
    dispatch(dispatchAction(GENERATE_TOKEN, null));
  };
};

export const resetGenerateTokenError = () => {
  return (dispatch, getState) => {
    dispatch(dispatchAction(ERRORS_GENERATE_TOKEN, null));
  };
};

export const generateToken = (data, formData) => {
  return (dispatch, getState) => {
    console.log("Generating Token : " + data);
    dispatch(dispatchAction(GENERATE_TOKEN_LOADING, true));
    axios
      .post("/common/FuelToken/generateTokenExtra", data)
      .then((res) => {
        console.log(res.data);
        if (!res.data.status) {
          throw new Error("Error Generating Token");
        }
        dispatch(dispatchAction(GENERATE_TOKEN, res.data.message));
        dispatch(generateTrip(formData));
      })
      .catch((error) => {
        isDev() && console.log(error);
        dispatch(dispatchAction(GENERATE_TOKEN_LOADING, false));
        dispatch(
          dispatchAction(ERRORS_GENERATE_TOKEN, "Error Generating Token")
        );
      });
  };
};

export const generateTrip = (formData) => {
  return (dispatch, getState) => {
    let url = "";
    if (formData.roundTrip) {
      url = "/mtoadmin/tripManagement/createTripTwoWay";
    } else {
      url = "/mtoadmin/tripManagement/createTrip";
    }

    //SET Form data as
    // "driverId": "5",
    // "vehicleRegNo": "AS12465",
    // "tripFrom": "abc",
    // "tripTo": "def",
    // "fromLongitude": "",
    // "fromLatitude": "",
    // "toLongitude": "",
    // "toLatitude": "",
    // "tripScheduled": "2020-07-17 20:25",
    // "purpose": "aaa bb cc",
    // "expectedKM": "25",
    // "expectedTime": "1:53",
    // "tokenNo": "160720073",
    // "routePath": ""

    console.log("Generating Trip : " + formData);
    dispatch(dispatchAction(CREATE_TRIP_LOADING, true));
    axios
      .post(url, formData)
      .then((res) => {
        console.log(res.data);
        if (!res.data.status) {
          throw new Error("Error Creating Trip");
        }
        dispatch(dispatchAction(CREATE_TRIP, res.data.message));
        dispatch(
          dispatchAction(SET_NOTIFICATION, "New Trip Created Successfully")
        );
      })
      .catch((error) => {
        isDev() && console.log(error);
        dispatch(dispatchAction(CREATE_TRIP_LOADING, false));
        dispatch(dispatchAction(ERRORS_CREATE_TRIP, "Error Creating Trip"));
      });
  };
};
