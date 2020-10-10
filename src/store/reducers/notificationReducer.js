import { SET_NOTIFICATION } from "../actions/types";

const initialState = {};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        message: action.payload,
      };
    default:
      return {};
  }
};

export default notificationReducer;
