import { GET_ALL_DRIVERS, SET_DRIVER_LOADING } from "../actions/types";

const initialState = {};

const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DRIVER_LOADING:
      return {
        ...state,
        driverLoading: true,
      };
    case GET_ALL_DRIVERS:
      return {
        ...state,
        driverList: action.payload,
        driverLoading: false,
      };
    default:
      return state;
  }
};

export default vehicleReducer;
