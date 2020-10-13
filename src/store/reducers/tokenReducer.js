const {
  ADD_TOKEN_LOADING,
  ADD_TOKEN,
  GET_PENDING_TOKEN_LOADING,
  GET_PENDING_TOKEN,
  GET_APPROVED_TOKEN_LOADING,
  GET_APPROVED_TOKEN,
  GET_REJECTED_TOKEN_LOADING,
  GET_REJECTED_TOKEN,
  ERRORS_ADD_TOKEN,
  ERRORS_GET_PENDING_TOKEN,
  ERRORS_GET_APPROVED_TOKEN,
  ERRORS_GET_REJECTED_TOKEN,
  TOKEN_APPROVE_LOADING,
  TOKEN_APPROVE_MESSAGE,
  ERRORS_TOKEN_APPROVE,
} = require("../actions/types");

const initialState = {
  addTokenLoading: false,
  generatedToken: {},
  getPendingTokenLoading: false,
  pendingTokenList: [],
  getApprovedTokenLoading: false,
  approvedTokenList: [],
  getRejectedTokenLoading: false,
  rejectedTokenList: [],
  addTokenError: null,
  getPendingTokenError: null,
  getApprovedTokenError: null,
  getRejectedTokenError: null,
  tokenApproveMessage: null,
  tokenApproveLoading: false,
  tokenApproveError: null,
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOKEN_LOADING:
      return {
        ...state,
        addTokenLoading: action.payload,
      };
    case ADD_TOKEN:
      return {
        ...state,
        generatedToken: action.payload,
        addTokenLoading: false,
        addTokenError: null,
      };
    case GET_PENDING_TOKEN_LOADING:
      return {
        ...state,
        getPendingTokenLoading: action.payload,
      };
    case GET_PENDING_TOKEN:
      return {
        ...state,
        pendingTokenList: action.payload,
        getPendingTokenLoading: false,
        getPendingTokenError: null,
      };
    case GET_APPROVED_TOKEN_LOADING:
      return {
        ...state,
        getApprovedTokenLoading: action.payload,
      };
    case GET_APPROVED_TOKEN:
      return {
        ...state,
        approvedTokenList: action.payload,
        getApprovedTokenLoading: false,
        getApprovedTokenError: null,
      };
    case GET_REJECTED_TOKEN_LOADING:
      return {
        ...state,
        getRejectedTokenLoading: action.payload,
      };
    case GET_REJECTED_TOKEN:
      return {
        ...state,
        rejectedTokenList: action.payload,
        getRejectedTokenLoading: false,
        getRejectedTokenError: null,
      };
    case ERRORS_ADD_TOKEN:
      return {
        ...state,
        addTokenError: action.payload,
      };
    case ERRORS_GET_PENDING_TOKEN:
      return {
        ...state,
        pendingTokenList: [],
        getPendingTokenError: action.payload,
      };
    case ERRORS_GET_APPROVED_TOKEN:
      return {
        ...state,
        getApprovedTokenError: action.payload,
      };
    case ERRORS_GET_REJECTED_TOKEN:
      return {
        ...state,
        getRejectedTokenError: action.payload,
      };
    case TOKEN_APPROVE_LOADING:
      return {
        ...state,
        tokenApproveMessage: null,
        tokenApproveLoading: action.payload,
        tokenApproveError: null,
      };
    case TOKEN_APPROVE_MESSAGE:
      return {
        ...state,
        tokenApproveMessage: action.payload,
        tokenApproveLoading: false,
        tokenApproveError: null,
      };
    case ERRORS_TOKEN_APPROVE:
      return {
        ...state,
        tokenApproveMessage: null,
        tokenApproveLoading: false,
        tokenApproveError: action.payload,
      };
    default:
      return state;
  }
};

export default tokenReducer;
