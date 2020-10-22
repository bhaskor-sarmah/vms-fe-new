import securityReducer from "./securityReducer";
import errorReducer from "./errorReducer";
import notificationReducer from "./notificationReducer";
import vehicleReducer from "./vehicleReducer";
import driverReducer from "./driverReducer";
import { combineReducers } from "redux";
import tokenReducer from "./tokenReducer";
import tripReducer from "./tripReducer";

const appReducer = combineReducers({
  security: securityReducer,
  globalErrors: errorReducer,
  notification: notificationReducer,
  vehicle: vehicleReducer,
  driver: driverReducer,
  token: tokenReducer,
  trip: tripReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
