import { SET_LON_LAT_FROM, SET_LON_LAT_TO, SET_TRIP_DISTANCE } from "../actions/types";

const initialState = {
  latLngFrom: null,
  latLngTo: null,
  tripDistance: null
};

const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LON_LAT_FROM:
      return {
        ...state,
        latLngFrom: action.payload,
        tripDistance: null
      };
    case SET_LON_LAT_TO:
      return {
        ...state,
        latLngTo: action.payload,
        tripDistance: null
      };
    case SET_TRIP_DISTANCE:
      return {
        ...state,
        tripDistance: action.payload,
      };
    default:
      return state;
  }
};

export default tripReducer;
