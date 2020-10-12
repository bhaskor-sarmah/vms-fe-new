import React, { Fragment } from "react";
import ApprovedTokens from "./ApprovedTokens";
import CreateToken from "./CreateToken";
import RejectedTokens from "./RejectedTokens";
import { useDispatch } from "react-redux";
import {
  getApprovedTokens,
  getRejectedTokens,
} from "../../store/actions/tokenActions";
import {
  approvedTokenPageSize,
  rejectedTokenPageSize,
} from "../utils/Constants";
import { getAllDrivers } from "../../store/actions/driverActions";
import { getAllVehicles } from "../../store/actions/vehicleActions";

const Token = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    switch (e.target.id) {
      case "create-token":
        // Update the latestdata on click
        dispatch(getAllDrivers());
        dispatch(getAllVehicles());
        break;
      case "token-approved":
        dispatch(getApprovedTokens(1, approvedTokenPageSize));
        break;
      case "rejected-tokens":
        dispatch(getRejectedTokens(1, rejectedTokenPageSize));
        break;
      default:
        break;
    }
  };
  return (
    <Fragment>
      <div className='content-header'>
        <div className='container-fluid'></div>
      </div>
      <div className='content'>
        <div className='container-fluid'>
          <ul className='nav nav-tabs' id='tokenTab' role='tablist'>
            <li className='nav-item'>
              <a
                className='nav-link active'
                id='create-token'
                data-toggle='tab'
                href='#createToken'
                role='tab'
                aria-controls='Create Token'
                aria-selected='false'
                onClick={handleClick}
              >
                Pending For Approval
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                id='token-approved'
                data-toggle='tab'
                href='#approvedTokens'
                role='tab'
                aria-controls='Approved Tokens'
                aria-selected='false'
                onClick={handleClick}
              >
                Approved Tokens
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                id='rejected-tokens'
                data-toggle='tab'
                href='#rejectedTokens'
                role='tab'
                aria-controls='Rejected Tokens'
                aria-selected='false'
                onClick={handleClick}
              >
                Rejected Tokens
              </a>
            </li>
          </ul>
          <div className='tab-content' id='tokenTabContent'>
            <CreateToken />
            <ApprovedTokens />
            <RejectedTokens />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Token;
