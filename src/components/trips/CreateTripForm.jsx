import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleAutoCompleteExample } from "./GoogleMap";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { getAllVehicles } from "../../store/actions/vehicleActions";
import { getAllDrivers } from "../../store/actions/driverActions";
import NotificationManager from "react-notifications/lib/NotificationManager";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { round } from "../../utils/numberUtils";

const calculateFuel = (distance, milage) => {
  console.log(distance)
  console.log(milage)
  return (round(distance/milage,2));
}

const CreateTripForm = () => {
  console.log("rendering form");
  const { register, handleSubmit, watch, errors, getValues, setValue } = useForm();
  const [tripDate, setTripDate] = useState(null);
  const [calcFuel, setCalcFuel] = useState(null);

  const vehicleList = useSelector((state) => state.vehicle.vehicleList);
  const vehicleLoading = useSelector((state) => state.vehicle.vehicleLoading);
  const driverList = useSelector((state) => state.driver.driverList);
  const driverLoading = useSelector((state) => state.driver.driverLoading);
  const addFormLoading = false; // get from state later\
  const generatedToken = null;

  const getAllVehiclesError = useSelector(
    (state) => state.vehicle.getVehicleError
  );
  const getAllDriversError = useSelector(
    (state) => state.driver.getDriverError
  );
  const tripDistance = useSelector((state) => state.trip.tripDistance);

  useEffect(() => {
    // check if trip distance is present in state
    if (tripDistance != null) {
      // get selected vehicle
      const vehicleRegNo = getValues('vehicleRegNo');

      if(vehicleRegNo && vehicleRegNo !== ""){
        // filter the vehicle to get the milage
        const vehicleFiltered = vehicleList.filter(v => v.regNo === vehicleRegNo);
        // console.log(vehicle[0]);
        const vehicle = vehicleFiltered[0];

        if(vehicle){
          setValue('fuelInLtrs', calculateFuel(tripDistance,vehicle.milage), { shouldValidate: true });
        }
      }
    }
  }, [vehicleList, getValues, setValue, tripDistance]);

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
    data.tripDate = moment(tripDate).format("DD-MM-YYYY");
    console.log(data);
  };

  return vehicleLoading || driverLoading ? (
    // if loading
    <h3>Loading...</h3>
  ) : addFormLoading ? (
    <h3>Generating New Trip...</h3>
  ) : (
    <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group row">
        <label htmlFor="vehicleRegNo" className="col-sm-4 col-form-label">
          Select Vehicle
        </label>
        <div className="col-sm-8">
          <select
            defaultValue={""}
            className={classnames("custom-select", {
              "is-invalid": errors.vehicleRegNo,
            })}
            name="vehicleRegNo"
            id="vehicleRegNo"
            ref={register({ required: true })}
          >
            <option value="">---SELECT---</option>
            {vehicleList &&
              vehicleList
                .sort((a, b) => a.regNo + "-" + a.type > b.regNo + "-" + b.type)
                .map((vehicle, i) => (
                  <option key={i} value={vehicle.regNo}>
                    {vehicle.regNo + "-" + vehicle.type}
                  </option>
                ))}
          </select>
          {errors.vehicleRegNo && errors.vehicleRegNo.type === "required" && (
            <span role="alert" className="text-danger">
              Please select vehicle
            </span>
          )}
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="driverId" className="col-sm-4 col-form-label">
          Select Driver
        </label>
        <div className="col-sm-8">
          <select
            defaultValue={""}
            className={classnames("custom-select", {
              "is-invalid": errors.driverId,
            })}
            name="driverId"
            id="driverId"
            ref={register({ required: true })}
          >
            <option value="">---SELECT---</option>
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
            <span role="alert" className="text-danger">
              Please select Driver
            </span>
          )}
        </div>
      </div>
      <GoogleAutoCompleteExample />
      <div className="form-group row">
        <div className="col-sm-4"></div>
        <div className="col-sm-8 custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="roundTrip"
            name="roundTrip"
            ref={register({ required: true })}
          />
          <label className="custom-control-label" htmlFor="roundTrip">
            Include Round Trip
          </label>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="purpose" className="col-sm-4 col-form-label">
          Purpose
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            className={classnames("form-control", {
              "is-invalid": errors.purpose,
            })}
            placeholder="Enter Purpose of Trip"
            name="purpose"
            id="purpose"
            ref={register({ required: true })}
          />
          {errors.purpose && errors.purpose.type === "required" && (
            <span role="alert" className="text-danger">
              Please enter purpose of trip
            </span>
          )}
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Select Date :</label>
        <div className="input-group col-sm-8">
          <div className="input-group-prepend" style={{ height: "38px" }}>
            <span className="input-group-text">
              <i className="far fa-calendar-alt" />
            </span>
          </div>
          <DatePicker
            placeholderText="dd/mm/yyyy"
            dateFormat="dd/MM/yyyy"
            selected={new Date()}
            className="form-control float-right"
            name="tripDate"
            onChange={(date) => setTripDate(date)}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="fuelInLtrs" className="col-sm-4 col-form-label">
          Enter Fuel
          <p style={{ fontSize: "x-small", marginBottom: "0" }}>(in Ltrs)</p>
        </label>
        <div className="col-sm-8">
          <input
            type="number"
            className={classnames("form-control", {
              "is-invalid": errors.fuelInLtrs,
            })}
            placeholder="Enter Fuel in Ltrs"
            name="fuelInLtrs"
            id="fuelInLtrs"
            ref={register({ required: true, min: 0 })}
          />
          {errors.fuelInLtrs && errors.fuelInLtrs.type === "required" && (
            <span role="alert" className="text-danger">
              Please enter Fuel in Ltrs
            </span>
          )}
          {errors.fuelInLtrs && errors.fuelInLtrs.type === "min" && (
            <span role="alert" className="text-danger">
              Fuel in Ltrs cannot be less than 0.
            </span>
          )}
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Generated Token :</label>
        <div className="input-group col-sm-8">
          {generatedToken && <label>{generatedToken}</label>}
        </div>
      </div>
      <div className="form-group row">
        <div className="input-group col-6">
          <button type="button" className="btn btn-info">
            Generate Token
          </button>
        </div>
        <div className="input-group col-6">
          <button type="submit" className="btn btn-success">
            Create Trip
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateTripForm;
