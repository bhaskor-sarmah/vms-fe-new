import { SET_NOTIFICATION } from "./types";

export const dispatchAction = (type, payload) => {
  return {
    type: type,
    payload: payload,
  };
};

export const resetNotification = () => {
  return (dispatch, getState) => {
    dispatch({ type: SET_NOTIFICATION, payload: null });
  };
};
