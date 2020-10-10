import {
  ERRORS_AUTH,
  ERRORS_GET_ALL_DRIVERS,
  ERRORS_ADD_DRIVER,
  ERRORS_GET_VEHICLE_CATEGORY,
  ERRORS_GET_VEHICLE_FUELTYPE,
  ERRORS_GET_VEHICLE_TYPE,
  ERRORS_ADD_VEHICLE,
  ERRORS_GET_ALL_VEHICLES,
} from "../actions/types";

const initialState = {};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERRORS_AUTH:
      return {
        authError: action.payload,
      };
    case ERRORS_GET_ALL_DRIVERS:
      return {
        getAllDriverError: action.payload,
      };
    case ERRORS_ADD_DRIVER:
      return { addDriverError: action.payload };
    case ERRORS_GET_VEHICLE_CATEGORY:
      return {
        getVehicleCategoryError: action.payload,
      };
    case ERRORS_GET_VEHICLE_FUELTYPE:
      return {
        getVehicleFuelTypeError: action.payload,
      };
    case ERRORS_GET_VEHICLE_TYPE:
      return {
        getVehicleTypeError: action.payload,
      };
    case ERRORS_ADD_VEHICLE:
      return {
        addVehicleError: action.payload,
      };
    case ERRORS_GET_ALL_VEHICLES:
      return {
        getAllVehiclesError: action.payload,
      };
    default:
      return {};
  }
};

export default errorReducer;
