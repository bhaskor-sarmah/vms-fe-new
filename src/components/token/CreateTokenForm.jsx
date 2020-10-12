import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDrivers } from "../../store/actions/driverActions";
import { getAllVehicles } from "../../store/actions/vehicleActions";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

const CreateTokenForm = () => {
  const dispatch = useDispatch();

  const vehicleList = useSelector((state) => state.vehicle.vehicleList);
  const vehicleLoading = useSelector((state) => state.vehicle.vehicleLoading);
  const driverList = useSelector((state) => state.driver.driverList);
  const driverLoading = useSelector((state) => state.driver.driverLoading);

  const getAllVehiclesError = useSelector(
    (state) => state.vehicle.getVehicleError
  );
  const getAllDriversError = useSelector(
    (state) => state.driver.getDriverError
  );

  useEffect(() => {
    dispatch(getAllVehicles());
    dispatch(getAllDrivers());
  }, [dispatch]);

  useEffect(() => {
    if (getAllVehiclesError) {
      NotificationManager.error("Error fetching Vehicle data !", "Error", 3000);
    }
  }, [getAllVehiclesError]);

  useEffect(() => {
    if (getAllDriversError) {
      NotificationManager.error("Error fetching Driver data !", "Error", 3000);
    }
  }, [getAllDriversError]);

  return (
    <div className='card'>
      <div className='card-header'>
        <div className='card-title'>Generate New Token</div>
      </div>
      {vehicleLoading || driverLoading ? (
        // if loading
        <div className='card-body'>
          <h3>Loading...</h3>
        </div>
      ) : (
        // No Loading No Errors
        <form className='form-horizontal'>
          <div className='card-body'>
            <div className='form-group row'>
              <label
                htmlFor='inputPassword3'
                className='col-sm-4 col-form-label'
              >
                Select Vehicle
              </label>
              <div className='col-sm-8'>
                <select className='custom-select'>
                  {vehicleList &&
                    vehicleList
                      .sort(
                        (a, b) =>
                          a.regNo + "-" + a.type > b.regNo + "-" + b.type
                      )
                      .map((vehicle, i) => (
                        <option key={i} value={vehicle.regNo}>
                          {vehicle.regNo + "-" + vehicle.type}
                        </option>
                      ))}
                </select>
              </div>
            </div>
            <div className='form-group row'>
              <label
                htmlFor='inputPassword3'
                className='col-sm-4 col-form-label'
              >
                Select Driver
              </label>
              <div className='col-sm-8'>
                <select className='custom-select'>
                  {driverList &&
                    driverList
                      .sort((a, b) => a.name > b.name)
                      .map((driver, i) => (
                        <option key={i} value={driver.id}>
                          {driver.name}
                        </option>
                      ))}
                </select>
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='inputEmail3' className='col-sm-4 col-form-label'>
                Enter Fuel
                <p style={{ fontSize: "x-small", marginBottom: "0" }}>
                  (in Ltrs)
                </p>
              </label>
              <div className='col-sm-8'>
                <input
                  type='number'
                  className='form-control'
                  id='inputEmail3'
                  placeholder='Enter Fuel in Ltrs'
                />
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='inputEmail3' className='col-sm-4 col-form-label'>
                Purpose
              </label>
              <div className='col-sm-8'>
                <input
                  type='email'
                  className='form-control'
                  id='inputEmail3'
                  placeholder='Enter Purpose of Trip'
                />
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='inputEmail3' className='col-sm-4 col-form-label'>
                Assigned Officer
              </label>
              <div className='col-sm-8'>
                <input
                  type='email'
                  className='form-control'
                  id='inputEmail3'
                  placeholder='Enter Officer Assigned To'
                />
              </div>
            </div>
          </div>
          <div className='card-footer text-center'>
            <button type='submit' className='btn btn-info'>
              Generate Token
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateTokenForm;
