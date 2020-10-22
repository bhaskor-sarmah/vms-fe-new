import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import ApprovedTrip from "./ApprovedTrip";
import CancelledTrip from "./CancelledTrip";
import CreateTrip from "./CreateTrip";
import PendingTrip from "./PendingTrip";

const Trip = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    switch (e.target.id) {
      case "create-trip":
        // Update the latestdata on click
        //   dispatch(getRejectedTokens(1, rejectedTokenPageSize));
        break;
      case "approved-trip":
        break;
      case "pending-trip":
        break;
      case "cancelled-trip":
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
          <ul className='nav nav-tabs' id='tripTab' role='tablist'>
            <li className='nav-item'>
              <a
                className='nav-link active'
                id='create-trip'
                data-toggle='tab'
                href='#createTrip'
                role='tab'
                aria-controls='Create Trip'
                aria-selected='false'
                onClick={handleClick}
              >
                Create Trip
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                id='approved-trip'
                data-toggle='tab'
                href='#approvedTrip'
                role='tab'
                aria-controls='Approved Trip'
                aria-selected='false'
                onClick={handleClick}
              >
                Approved Trip
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                id='pending-trip'
                data-toggle='tab'
                href='#pendingTrip'
                role='tab'
                aria-controls='Pending Trip'
                aria-selected='false'
                onClick={handleClick}
              >
                Pending for Approval
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                id='cancelled-trip'
                data-toggle='tab'
                href='#cancelledTrip'
                role='tab'
                aria-controls='Cancelled Trip'
                aria-selected='false'
                onClick={handleClick}
              >
                Cancelled Trip
              </a>
            </li>
          </ul>
          <div className='tab-content' id='tripTabContent'>
            <CreateTrip />
            <ApprovedTrip />
            <PendingTrip />
            <CancelledTrip />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Trip;
