import React, { useEffect } from "react";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  approveToken,
  getApprovalPendingTokens,
  rejectToken,
} from "../../store/actions/tokenActions";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { SET_NOTIFICATION } from "../../store/actions/types";
import { resetNotification } from "../../store/actions/globalDispatch";

const TokenDetails = ({ token }) => {
  const dispatch = useDispatch();

  const handleApproveToken = (tokenNo) => {
    dispatch(approveToken(tokenNo));
  };

  const handleRejectToken = (tokenNo) => {
    dispatch(rejectToken(tokenNo));
  };

  return (
    <div
      className='small-box'
      style={{ backgroundColor: "#138496", color: "white" }}
    >
      <div className='inner'>
        <div className='row'>
          <div className='col-12'>
            <h4>Token No - {token.tokenNo}</h4>
          </div>
          <div className='col-12 col-md-6'>Vehicle: {token.vehicleRegNo}</div>
          <div className='col-12 col-md-6'>Fuel: {token.fuelInLtrs}</div>
          <div className='col-12 col-md-6'>Purpose: {token.purpose}</div>
          <div className='col-12 col-md-6'>
            Officer Assigned To: {token.assignedTo}
          </div>
        </div>
      </div>
      <div className='small-box-footer'>
        <div className='row text-center'>
          <div className='col-6'>
            <button
              className='btn btn-default text-success'
              onClick={() => handleApproveToken(token.tokenNo)}
            >
              <i className='fas fa-thumbs-up' /> Approve
            </button>
          </div>
          <div className='col-6'>
            <button
              className='btn btn-default text-danger'
              onClick={() => handleRejectToken(token.tokenNo)}
            >
              <i className='fas fa-thumbs-down' /> Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    // <div className='info-box bg-success'>
    //   <span className='info-box-icon'>QR CODE HERE</span>
    //   <div className='info-box-content'>
    //     <span className='info-box-text'>{token.tokenNo}</span>
    //     <span className='info-box-number'>Fuel - {token.fuelInLtrs}</span>
    //     <div className='progress'>
    //       <div className='progress-bar' style={{ width: "70%" }} />
    //     </div>
    //     <span className='progress-description'>70% Increase in 30 Days</span>
    //   </div>
    // </div>
  );
};

export default TokenDetails;
