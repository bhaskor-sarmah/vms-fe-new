import {
  GET_ALL_VEHICLES,
  ADD_VEHICLE_LOADING,
  ADD_VEHICLE,
  GET_ALL_VEHICLE_LOADING,
  GET_ALL_VEHICLE_CATEGORY,
  GET_VEHICLE_CATEGORY_LOADING,
  GET_VEHICLE_FUELTYPE_LOADING,
  GET_ALL_VEHICLE_FUELTYPE,
  GET_VEHICLE_TYPE_LOADING,
  GET_ALL_VEHICLE_TYPE,
} from "../actions/types";

const initialState = {};

const vehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VEHICLE_LOADING:
      return {
        ...state,
        vehicleLoading: action.payload,
      };
    case GET_ALL_VEHICLES:
      return {
        ...state,
        vehicleList: action.payload,
        vehicleLoading: false,
      };
    case ADD_VEHICLE_LOADING:
      return {
        ...state,
        addVehicleLoading: action.payload,
      };
    case ADD_VEHICLE:
      return {
        ...state,
        addedVehicle: action.payload,
        addVehicleLoading: false,
      };
    case GET_VEHICLE_CATEGORY_LOADING:
      return {
        ...state,
        getVehicleCategoryLoading: action.payload,
      };
    case GET_ALL_VEHICLE_CATEGORY:
      return {
        ...state,
        vehicleCategoryList: action.payload,
        getVehicleCategoryLoading: false,
      };
    case GET_VEHICLE_FUELTYPE_LOADING:
      return {
        ...state,
        getVehicleFuelTypeLoading: action.payload,
      };
    case GET_ALL_VEHICLE_FUELTYPE:
      return {
        ...state,
        vehicleFuelTypeList: action.payload,
        getVehicleFuelTypeLoading: false,
      };
    case GET_VEHICLE_TYPE_LOADING:
      return {
        ...state,
        getVehicleTypeLoading: action.payload,
      };
    case GET_ALL_VEHICLE_TYPE:
      return {
        ...state,
        vehicleTypeList: action.payload,
        getVehicleTypeLoading: false,
      };
    default:
      return state;
  }
};

export default vehicleReducer;
