import axios from "axios";
import {
  GET_ALL_VEHICLES,
  GET_ALL_VEHICLE_LOADING,
  ADD_VEHICLE,
  ADD_VEHICLE_LOADING,
  GET_ALL_VEHICLE_CATEGORY,
  GET_VEHICLE_CATEGORY_LOADING,
  GET_ALL_VEHICLE_FUELTYPE,
  GET_VEHICLE_FUELTYPE_LOADING,
  GET_ALL_VEHICLE_TYPE,
  GET_VEHICLE_TYPE_LOADING,
  SET_NOTIFICATION,
  ERRORS_GET_VEHICLE_CATEGORY,
  ERRORS_GET_VEHICLE_TYPE,
  ERRORS_GET_ALL_VEHICLES,
  ERRORS_GET_VEHICLE_FUELTYPE,
  ERRORS_ADD_VEHICLE,
} from "./types";
import { dispatchAction } from "./globalDispatch";
import isDev from "../../utils/devDetect";

export const getAllVehicles = () => {
  return (dispatch, getState) => {
    dispatch(dispatchAction(GET_ALL_VEHICLE_LOADING, true));
    axios
      .get("/common/Vehicle/allVehicles")
      .then((res) => {
        // console.log(res.data);
        dispatch(dispatchAction(GET_ALL_VEHICLES, res.data));
      })
      .catch((error) => {
        isDev() && console.log(error);
        dispatch(dispatchAction(GET_ALL_VEHICLE_LOADING, false));
        dispatch(
          dispatchAction(ERRORS_GET_ALL_VEHICLES, "Error fetching vehicle list")
        );
      });
  };
};

export const addNewVehicles = (vehicleData) => {
  return (dispatch, getState) => {
    dispatch(dispatchAction(ADD_VEHICLE_LOADING, true));
    axios
      .post("/admin/Vehicle/addVehicle", vehicleData)
      .then((res) => {
        console.log(res.data);
        if (!res.data.status) {
          throw new Error("Error Adding Vehicle");
        }
        dispatch(dispatchAction(ADD_VEHICLE, res.data));
        dispatch(
          dispatchAction(SET_NOTIFICATION, "New Vehicle Added Successfully")
        );
      })
      .catch((error) => {
        isDev() && console.log(error);
        dispatch(dispatchAction(ADD_VEHICLE_LOADING, false));
        dispatch(dispatchAction(ERRORS_ADD_VEHICLE, "Error Adding Vehicle"));
      });
  };
};

export const getAllVehicleCategory = () => {
  return (dispatch, getState) => {
    dispatch(dispatchAction(GET_VEHICLE_CATEGORY_LOADING, true));
    axios
      .get("/common/Vehicle/getAllCategory")
      .then((res) => {
        // console.log(res.data);
        dispatch(dispatchAction(GET_ALL_VEHICLE_CATEGORY, res.data));
      })
      .catch((error) => {
        isDev() && console.log(error);
        dispatch(dispatchAction(GET_VEHICLE_CATEGORY_LOADING, false));
        dispatch(
          dispatchAction(
            ERRORS_GET_VEHICLE_CATEGORY,
            "Error fetching vehicle category"
          )
        );
      });
  };
};
export const getAllVehicleFuelType = () => {
  return (dispatch, getState) => {
    dispatch(dispatchAction(GET_VEHICLE_FUELTYPE_LOADING, true));
    axios
      .get("/common/Vehicle/getAllFuelType")
      .then((res) => {
        // console.log(res.data);
        dispatch(dispatchAction(GET_ALL_VEHICLE_FUELTYPE, res.data));
      })
      .catch((error) => {
        isDev() && console.log(error);
        dispatch(dispatchAction(GET_VEHICLE_FUELTYPE_LOADING, false));
        dispatch(
          dispatchAction(
            ERRORS_GET_VEHICLE_FUELTYPE,
            "Error fetching vehicle category"
          )
        );
      });
  };
};
export const getAllVehicleType = () => {
  return (dispatch, getState) => {
    dispatch(dispatchAction(GET_VEHICLE_TYPE_LOADING, true));
    axios
      .get("/common/vehicleType/getAll")
      .then((res) => {
        // console.log(res.data);
        dispatch(dispatchAction(GET_ALL_VEHICLE_TYPE, res.data));
      })
      .catch((error) => {
        isDev() && console.log(error);
        dispatch(dispatchAction(GET_VEHICLE_TYPE_LOADING, false));
        dispatch(
          dispatchAction(ERRORS_GET_VEHICLE_TYPE, "Error fetching vehicle type")
        );
      });
  };
};

export const resetAddVehicleError = () => {
  return (dispatch, getState) => {
    dispatch({ type: ERRORS_ADD_VEHICLE, payload: null });
  };
};
