import {
  ERRORS_AUTH,
  SET_CURRENT_USER,
  SET_USER_LOADING,
} from "../actions/types";

const initialState = {
  validToken: false,
  user: {},
  userLoading: false,
  authError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: action.payload ? true : false,
        user: action.payload,
        userLoading: false,
        authError: null,
      };
    case SET_USER_LOADING:
      return {
        ...state,
        userLoading: action.payload,
        authError: null,
      };
    case ERRORS_AUTH:
      return {
        ...state,
        authError: action.payload,
      };
    default:
      return state;
  }
}
