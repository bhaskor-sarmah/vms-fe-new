import {
  GET_ALL_DRIVERS,
  SET_DRIVER_LOADING,
  ADD_DRIVER_LOADING,
  ADD_DRIVER,
  ERRORS_GET_ALL_DRIVERS,
  ERRORS_ADD_DRIVER,
} from "../actions/types";

const initialState = {
  driverLoading: false,
  driverList: [],
  addDriverLoading: false,
  addedDriver: {},
  getDriverError: null,
  addDriverError: null,
};

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
        getDriverError: null,
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
        addDriverError: null,
      };
    case ERRORS_GET_ALL_DRIVERS:
      return {
        ...state,
        getDriverError: action.payload,
      };
    case ERRORS_ADD_DRIVER:
      return {
        ...state,
        addDriverError: action.payload,
        addDriverLoading: false,
      };
    default:
      return state;
  }
};

export default driverReducer;
