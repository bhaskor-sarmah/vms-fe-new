import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import AddDriver from "./AddDriver";
import AllDrivers from "./AllDrivers";

const Driver = () => {
  const location = useLocation();
  return (
    <Fragment>
      <div className='content-header'>
        <div className='container-fluid'>
          {/* <div className='row mb-2'>
            <div className='col-sm-6'>
              <h1 className='m-0 text-dark'>Driver</h1>
            </div>
            <div className='col-sm-6'>
              <ol className='breadcrumb float-sm-right'>
                <li className='breadcrumb-item'>Dashboard</li>
                <li className='breadcrumb-item active'>
                  <Link to={location.pathname}>Drivers</Link>
                </li>
              </ol>
            </div>
          </div> */}
        </div>
      </div>
      <div className='content'>
        <div className='container-fluid'>
          <ul className='nav nav-tabs' id='myTab' role='tablist'>
            <li className='nav-item'>
              <a
                className='nav-link active'
                id='add-driver'
                data-toggle='tab'
                href='#addDriver'
                role='tab'
                aria-controls='Add Driver'
                aria-selected='true'
              >
                Add Driver
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                id='all-driver'
                data-toggle='tab'
                href='#allDriver'
                role='tab'
                aria-controls='Add Driver'
                aria-selected='false'
              >
                All Drivers
              </a>
            </li>
          </ul>
          <div className='tab-content' id='myTabContent'>
            <AddDriver />
            <AllDrivers />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Driver;
