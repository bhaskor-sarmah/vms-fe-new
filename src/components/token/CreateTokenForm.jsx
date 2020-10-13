import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDrivers } from "../../store/actions/driverActions";
import { getAllVehicles } from "../../store/actions/vehicleActions";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useForm } from "react-hook-form";
import classnames from "classnames";
import {
  generateNewToken,
  getApprovalPendingTokens,
  restAddTokenErrorMessage,
} from "../../store/actions/tokenActions";
import { resetNotification } from "../../store/actions/globalDispatch";

const CreateTokenForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();
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
  const addTokenLoading = useSelector((state) => state.token.addTokenLoading);
  const addTokenError = useSelector((state) => state.token.addTokenError);
  const successAddToken = useSelector((state) => state.notification.message);

  useEffect(() => {
    dispatch(getAllVehicles());
    dispatch(getAllDrivers());
  }, [dispatch]);

  useEffect(() => {
    if (getAllVehiclesError) {
      NotificationManager.error(getAllVehiclesError, "Error", 3000);
    }
  }, [getAllVehiclesError]);

  useEffect(() => {
    if (getAllDriversError) {
      NotificationManager.error(getAllDriversError, "Error", 3000);
    }
  }, [getAllDriversError]);

  const onSubmit = (data, e) => {
    dispatch(generateNewToken(data));
    e.target.reset();
  };

  useEffect(() => {
    if (addTokenError) {
      NotificationManager.error(addTokenError, "Error", 3000);
      dispatch(restAddTokenErrorMessage());
    }
  }, [dispatch, addTokenError]);

  useEffect(() => {
    if (successAddToken) {
      NotificationManager.success(successAddToken, "Success", 3000);
      dispatch(resetNotification());
      dispatch(getApprovalPendingTokens());
    }
  }, [dispatch, successAddToken]);

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
      ) : addTokenLoading ? (
        <div className='card-body'>
          <h3>Generating New Token...</h3>
        </div>
      ) : (
        // No Loading No Errors
        <form className='form-horizontal' onSubmit={handleSubmit(onSubmit)}>
          <div className='card-body'>
            <div className='form-group row'>
              <label htmlFor='vehicleRegNo' className='col-sm-4 col-form-label'>
                Select Vehicle
              </label>
              <div className='col-sm-8'>
                <select
                  defaultValue={""}
                  className={classnames("custom-select", {
                    "is-invalid": errors.vehicleRegNo,
                  })}
                  name='vehicleRegNo'
                  id='vehicleRegNo'
                  ref={register({ required: true })}
                >
                  <option value=''>---SELECT---</option>
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
                {errors.vehicleRegNo &&
                  errors.vehicleRegNo.type === "required" && (
                    <span role='alert' className='text-danger'>
                      Please select vehicle
                    </span>
                  )}
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='driverId' className='col-sm-4 col-form-label'>
                Select Driver
              </label>
              <div className='col-sm-8'>
                <select
                  defaultValue={""}
                  className={classnames("custom-select", {
                    "is-invalid": errors.driverId,
                  })}
                  name='driverId'
                  id='driverId'
                  ref={register({ required: true })}
                >
                  <option value=''>---SELECT---</option>
                  {driverList &&
                    driverList
                      .sort((a, b) => a.name > b.name)
                      .map((driver, i) => (
                        <option key={i} value={driver.id}>
                          {driver.name}
                        </option>
                      ))}
                </select>
                {errors.driverId && errors.driverId.type === "required" && (
                  <span role='alert' className='text-danger'>
                    Please select Driver
                  </span>
                )}
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='fuelInLtrs' className='col-sm-4 col-form-label'>
                Enter Fuel
                <p style={{ fontSize: "x-small", marginBottom: "0" }}>
                  (in Ltrs)
                </p>
              </label>
              <div className='col-sm-8'>
                <input
                  type='number'
                  className={classnames("form-control", {
                    "is-invalid": errors.fuelInLtrs,
                  })}
                  placeholder='Enter Fuel in Ltrs'
                  name='fuelInLtrs'
                  id='fuelInLtrs'
                  ref={register({ required: true, min: 0 })}
                />
                {errors.fuelInLtrs && errors.fuelInLtrs.type === "required" && (
                  <span role='alert' className='text-danger'>
                    Please enter Fuel in Ltrs
                  </span>
                )}
                {errors.fuelInLtrs && errors.fuelInLtrs.type === "min" && (
                  <span role='alert' className='text-danger'>
                    Fuel in Ltrs cannot be less than 0.
                  </span>
                )}
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='purpose' className='col-sm-4 col-form-label'>
                Purpose
              </label>
              <div className='col-sm-8'>
                <input
                  type='text'
                  className={classnames("form-control", {
                    "is-invalid": errors.purpose,
                  })}
                  placeholder='Enter Purpose of Trip'
                  name='purpose'
                  id='purpose'
                  ref={register({ required: true })}
                />
                {errors.purpose && errors.purpose.type === "required" && (
                  <span role='alert' className='text-danger'>
                    Please enter purpose of trip
                  </span>
                )}
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='inputEmail3' className='col-sm-4 col-form-label'>
                Assigned Officer
              </label>
              <div className='col-sm-8'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter Officer Assigned To'
                  name='assignedTo'
                  ref={register({ required: false })}
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
