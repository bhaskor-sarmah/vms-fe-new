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
        // Sample Response
        //   {
        //     "message": "EXT1210201326",
        //     "status": true
        //   }

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
      .get("/common/FuelToken/generateTokenExtra")
      .then((res) => {
        console.log(res.data);
        dispatch(dispatchAction(GET_PENDING_TOKEN, res.data));
      })
      .catch((error) => {
        isDev() && console.log(error);
        dispatch(dispatchAction(GET_PENDING_TOKEN_LOADING, false));
        dispatch(
          dispatchAction(
            ERRORS_GET_PENDING_TOKEN,
            "Error Getting Pending Token List"
          )
        );
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
