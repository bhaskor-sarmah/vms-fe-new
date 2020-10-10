import React, { Fragment, useEffect } from "react";
import {
  getAllVehicles,
  getAllVehicleCategory,
  getAllVehicleFuelType,
  getAllVehicleType,
} from "../../store/actions/vehicleActions.js";
import AddVehicle from "./AddVehicle";
import AllVehicle from "./AllVehicle";
import { useDispatch } from "react-redux";
import VehicleCategory from "./VehicleCategory.jsx";
import VehicleType from "./VehicleType.jsx";
import FuelType from "./FuelType.jsx";

const Vehicle = () => {
  //const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVehicleCategory());
    dispatch(getAllVehicleFuelType());
    dispatch(getAllVehicleType());
  }, [dispatch]);

  const handleAllVehicleClick = () => {
    dispatch(getAllVehicles());
  };

  return (
    <Fragment>
      <div className='content-header'>
        <div className='container-fluid'>
          {/* 
          <div className='row mb-2'>
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
          </div>
          */}
        </div>
      </div>
      <div className='content'>
        <div className='container-fluid'>
          <ul className='nav nav-tabs' id='vehicleTab' role='tablist'>
            <li className='nav-item'>
              <a
                className='nav-link active'
                id='all-vehicle'
                data-toggle='tab'
                href='#allVehicle'
                role='tab'
                aria-controls='All Vehicles'
                aria-selected='false'
                onClick={handleAllVehicleClick}
              >
                All Vehicles
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                id='categories'
                data-toggle='tab'
                href='#vehicleCategories'
                role='tab'
                aria-controls='Vehicle Categories'
                aria-selected='false'
              >
                Categories
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                id='vehicleTypes'
                data-toggle='tab'
                href='#vehicleType'
                role='tab'
                aria-controls='Vehicle Type'
                aria-selected='false'
              >
                Vehicle Type
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                id='fuelTypes'
                data-toggle='tab'
                href='#fuelType'
                role='tab'
                aria-controls='Fuel Type'
                aria-selected='false'
              >
                Fuel Type
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                id='add-vehicle'
                data-toggle='tab'
                href='#addVehicle'
                role='tab'
                aria-controls='Add Vehicle'
                aria-selected='true'
              >
                Add Vehicle
              </a>
            </li>
          </ul>
          <div className='tab-content' id='vehicleTabContent'>
            <AddVehicle />
            <AllVehicle />
            <VehicleCategory />
            <VehicleType />
            <FuelType />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Vehicle;
