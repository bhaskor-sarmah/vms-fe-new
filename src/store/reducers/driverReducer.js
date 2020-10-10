import {
  GET_ALL_DRIVERS,
  SET_DRIVER_LOADING,
  ADD_DRIVER_LOADING,
  ADD_DRIVER,
} from "../actions/types";

const initialState = {};

const driverReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DRIVER_LOADING:
      return {
        ...state,
        driverLoading: action.payload,
      };
    case GET_ALL_DRIVERS:
      return {
        ...state,
        driverList: action.payload,
        driverLoading: false,
      };
    case ADD_DRIVER_LOADING:
      return {
        ...state,
        addDriverLoading: true,
      };
    case ADD_DRIVER:
      return {
        ...state,
        addedDriver: action.payload,
        addDriverLoading: false,
      };
    default:
      return state;
  }
};

export default driverReducer;
