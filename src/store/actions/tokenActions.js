import axios from "axios";
import {
  ADD_TOKEN,
  ADD_TOKEN_LOADING,
  ERRORS_ADD_TOKEN,
  GET_PENDING_TOKEN,
  GET_PENDING_TOKEN_LOADING,
  GET_APPROVED_TOKEN_LOADING,
  GET_APPROVED_TOKEN,
  GET_REJECTED_TOKEN_LOADING,
  GET_REJECTED_TOKEN,
  SET_NOTIFICATION,
  ERRORS_GET_PENDING_TOKEN,
  ERRORS_GET_APPROVED_TOKEN,
  ERRORS_GET_REJECTED_TOKEN,
  ERRORS_TOKEN_APPROVE,
  TOKEN_APPROVE_LOADING,
  TOKEN_APPROVE_MESSAGE,
} from "./types";
import { dispatchAction } from "./globalDispatch";
import isDev from "../../utils/devDetect";

export const generateNewToken = (tokenData) => {
  return (dispatch, getState) => {
    console.log("Generating New Token");
    dispatch(dispatchAction(ADD_TOKEN_LOADING, true));
    axios
      .post("/common/FuelToken/generateTokenExtra", tokenData)
      .then((res) => {
        console.log(res.data);
        if (!res.data.status) {
          throw new Error("Error Generating Token");
        }
        dispatch(dispatchAction(ADD_TOKEN, res.data));
        dispatch(
          dispatchAction(SET_NOTIFICATION, "New Token Generated Successfully")
        );
      })
      .catch((error) => {
        isDev() && console.log(error);
        dispatch(dispatchAction(ADD_TOKEN_LOADING, false));
        dispatch(dispatchAction(ERRORS_ADD_TOKEN, "Error Generating Token"));
      });
  };
};

export const getApprovalPendingTokens = () => {
  return (dispatch, getState) => {
    console.log("Generating New Token");
    dispatch(dispatchAction(GET_PENDING_TOKEN_LOADING, true));
    axios
      .get("/common/FuelToken/listOfExtraTokenForApproval")
      .then((res) => {
        console.log(res.data);
        dispatch(dispatchAction(GET_PENDING_TOKEN, res.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(dispatchAction(GET_PENDING_TOKEN_LOADING, false));
        if (error.response.data.httpStatus === "NOT_FOUND") {
          dispatch(dispatchAction(GET_PENDING_TOKEN, []));
        } else {
          dispatch(
            dispatchAction(
              ERRORS_GET_PENDING_TOKEN,
              "Error Getting Pending Token List"
            )
          );
        }
      });
  };
};
export const getApprovedTokens = (pageNo, pageSize) => {
  return (dispatch, getState) => {
    console.log("Generating New Token");
    dispatch(dispatchAction(GET_APPROVED_TOKEN_LOADING, true));
    axios
      .get(`/common/FuelToken/listApproved/${pageNo}/${pageSize}`)
      .then((res) => {
        console.log(res.data);
        dispatch(dispatchAction(GET_APPROVED_TOKEN, res.data));
      })
      .catch((error) => {
        isDev() && console.log(error);
        dispatch(dispatchAction(GET_APPROVED_TOKEN_LOADING, false));
        dispatch(
          dispatchAction(
            ERRORS_GET_APPROVED_TOKEN,
            "Error Getting Approved Token List"
          )
        );
      });
  };
};
export const getRejectedTokens = (pageNo, pageSize) => {
  return (dispatch, getState) => {
    console.log("Generating New Token");
    dispatch(dispatchAction(GET_REJECTED_TOKEN_LOADING, true));
    axios
      .get(`/common/FuelToken/listRejected/${pageNo}/${pageSize}`)
      .then((res) => {
        console.log(res.data);
        dispatch(dispatchAction(GET_REJECTED_TOKEN, res.data));
      })
      .catch((error) => {
        isDev() && console.log(error);
        dispatch(dispatchAction(GET_REJECTED_TOKEN_LOADING, false));
        dispatch(
          dispatchAction(
            ERRORS_GET_REJECTED_TOKEN,
            "Error Getting Rejected Token List"
          )
        );
      });
  };
};

export const approveToken = (tokenNo) => {
  return (dispatch, getState) => {
    console.log("Generating New Token");
    dispatch(dispatchAction(TOKEN_APPROVE_LOADING, true));
    axios
      .post("/tripManager/FuelToken/ApproveToken", { tokenNo: tokenNo })
      .then((res) => {
        console.log(res.data);
        if (!res.data.status) {
          throw new Error("Error Approving Token");
        }
        dispatch(
          dispatchAction(TOKEN_APPROVE_MESSAGE, "Token Approved Successfully")
        );
      })
      .catch((error) => {
        isDev() && console.log(error);
        dispatch(dispatchAction(TOKEN_APPROVE_LOADING, false));
        dispatch(dispatchAction(ERRORS_TOKEN_APPROVE, "Error Approving Token"));
      });
  };
};
export const rejectToken = (tokenNo) => {
  return (dispatch, getState) => {
    console.log("Generating New Token");
    dispatch(dispatchAction(TOKEN_APPROVE_LOADING, true));
    axios
      .post("/tripManager/FuelToken/RejectToken", { tokenNo: tokenNo })
      .then((res) => {
        console.log(res.data);
        if (!res.data.status) {
          throw new Error("Error Rejecting Token");
        }
        dispatch(
          dispatchAction(TOKEN_APPROVE_MESSAGE, "Token Rejected Successfully")
        );
      })
      .catch((error) => {
        isDev() && console.log(error);
        dispatch(dispatchAction(TOKEN_APPROVE_LOADING, false));
        dispatch(dispatchAction(ERRORS_TOKEN_APPROVE, "Error Rejecting Token"));
      });
  };
};

export const restAddTokenErrorMessage = () => {
  return (dispatch, getState) => {
    dispatch({ type: ERRORS_ADD_TOKEN, payload: null });
  };
};
export const restTokenApproveMessage = () => {
  return (dispatch, getState) => {
    dispatch({ type: TOKEN_APPROVE_MESSAGE, payload: null });
  };
};
export const restTokenErrorMessage = () => {
  return (dispatch, getState) => {
    dispatch({ type: ERRORS_TOKEN_APPROVE, payload: null });
  };
};
