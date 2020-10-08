import securityReducer from "./securityReducer";
import errorReducer from "./errorReducer";
import vehicleReducer from "./vehicleReducer";
import driverReducer from "./driverReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  security: securityReducer,
  errors: errorReducer,
  vehicle: vehicleReducer,
  driver: driverReducer,
});

export default rootReducer;
