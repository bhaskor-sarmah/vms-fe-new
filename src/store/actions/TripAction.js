import axios from "axios";
import { SET_LON_LAT_FROM, SET_LON_LAT_TO, SET_TRIP_DISTANCE } from "./types";
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
    dist = dist/1000;
    dispatch(dispatchAction(SET_TRIP_DISTANCE, dist));
  };
}
