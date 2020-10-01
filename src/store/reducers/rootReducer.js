import securityReducer from "./securityReducer";
import errorReducer from "./errorReducer";
import vehicleReducer from "./vehicleReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  security: securityReducer,
  errors: errorReducer,
  vehicle: vehicleReducer,
});

export default rootReducer;
