import React, { useEffect, useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleAutoCompleteExample } from "./GoogleMap";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { generateToken, resetGenerateTokenError } from "../../store/actions/TripAction";
import NotificationManager from "react-notifications/lib/NotificationManager";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { round } from "../../utils/numberUtils";
import { resetNotification } from "../../store/actions/globalDispatch";

const calculateFuel = (distance, milage) => {
  console.log(distance);
  console.log(milage);
  return Math.ceil(distance / milage);
  // return (round(distance/milage,2));
};

const CreateTripForm = () => {
  console.log("rendering form");
  const {
    register,
    handleSubmit,
    watch,
    errors,
    getValues,
    setValue,
  } = useForm();
  const [tripDate, setTripDate] = useState(null);
  // const [calcFuel, setCalcFuel] = useState(null);

  // variable to store from and to names
  const [addressFrom, setAddressFrom] = useState(null);
  const [addressTo, setAddressTo] = useState(null);
  const [errorFrom, setErrorFrom] = useState(null);
  const [errorTo, setErrorTo] = useState(null);

  const setSourceDest = (address, type) => {
    if (type === "FROM") {
      setAddressFrom(address);
      // setAddressFrom(address.address_components[0].short_name+","+address.address_components[1].short_name);
    }
    if (type === "TO") {
      setAddressTo(address);
      // setAddressTo(address.address_components[0].short_name+","+address.address_components[1].short_name);
    }
  };

  const dispatch = useDispatch();

  const vehicleList = useSelector((state) => state.vehicle.vehicleList);
  const vehicleLoading = useSelector((state) => state.vehicle.vehicleLoading);
  const driverList = useSelector((state) => state.driver.driverList);
  const driverLoading = useSelector((state) => state.driver.driverLoading);
  const addFormLoading = false; // get from state later\
  const generateTokenLoading = useSelector((state) => state.trip.generateTokenLoading);
  const generatedToken = useSelector((state) => state.trip.generatedToken);
  const generateTokenError = useSelector((state) => state.trip.generateTokenError);
  const successGenerateToken = useSelector((state) => state.notification.message);

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
      const vehicleRegNo = getValues("vehicleRegNo");

      if (vehicleRegNo && vehicleRegNo !== "") {
        // filter the vehicle to get the milage
        const vehicleFiltered = vehicleList.filter(
          (v) => v.regNo === vehicleRegNo
        );
        // console.log(vehicle[0]);
        const vehicle = vehicleFiltered[0];
        console.log(vehicle);
        if (vehicle) {
          setValue("fuelInLtrs", calculateFuel(tripDistance, vehicle.mileage), {
            shouldValidate: true,
          });
        }
      }
    }
  }, [vehicleList, getValues, setValue, tripDistance]);

  const handleVehicleChange = () => {
    // check if trip distance is present in state
    if (tripDistance != null) {
      // get selected vehicle
      const vehicleRegNo = getValues("vehicleRegNo");

      if (vehicleRegNo && vehicleRegNo !== "") {
        // filter the vehicle to get the milage
        const vehicleFiltered = vehicleList.filter(
          (v) => v.regNo === vehicleRegNo
        );
        // console.log(vehicle[0]);
        const vehicle = vehicleFiltered[0];
        if (vehicle) {
          setValue("fuelInLtrs", calculateFuel(tripDistance, vehicle.mileage), {
            shouldValidate: true,
          });
        }
      }
    }
  };

  const handleRoundTrip = () => {
    // console.log(getValues());
    const fuel = getValues("fuelInLtrs");
    if (fuel > 0) {
      const roundTrip = getValues("roundTrip");
      roundTrip
        ? setValue("fuelInLtrs", fuel * 2, { shouldValidate: true })
        : setValue("fuelInLtrs", calculateFuel(fuel, 2), {
            shouldValidate: true,
          });
    }
  };

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

  const onSubmit = (formData) => {
    if (tripDistance == null) {
      if (addressFrom == null) {
        setErrorFrom("Please select Source");
      } else if (addressTo == null) {
        setErrorTo("Please select destination");
      } else {
        setErrorFrom("Some error has ocurred");
      }
    } else {
      console.log(formData);
      setErrorFrom(null);
      setErrorTo(null);
        // Generate Token Clicked
        // Build the new data
        let data = {};
        data.vehicleRegNo = formData.vehicleRegNo;
        data.driverId = formData.driverId;
        data.fuelInLtrs = formData.fuelInLtrs;
        data.purpose = formData.purpose;
        data.assignedTo = formData.assignedTo;
        console.log(data);

        // Add date to the form data
        formData.tripDate = moment(tripDate).format("DD-MM-YYYY");
        formData.tripFrom = addressFrom;
        formData.tripTo = addressTo;
        console.log(formData);

        dispatch(generateToken(data, formData));
        // Final Submit
    }
  };

  // const handleGenerateToken = handleSubmit((data) => {
  //   data.submitType = "generateToken";
  //   onSubmit(data);
  // });

  useLayoutEffect(() => {
    if (generateTokenError) {
      NotificationManager.error(generateTokenError, "Error", 3000);
      dispatch(resetGenerateTokenError());
    }
  }, [dispatch, generateTokenError]);

  useLayoutEffect(() => {
    if (successGenerateToken) {
      NotificationManager.success(successGenerateToken, "Success", 3000);
      dispatch(resetNotification());
    }
  }, [dispatch, successGenerateToken]);


  return vehicleLoading || driverLoading ? (
    // if loading
    <h3>Loading...</h3>
  ) : addFormLoading ? (
    <h3>Generating New Trip...</h3>
  ) : generateTokenLoading ? (
    <h3>Generating Token...</h3>
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
            onChange={handleVehicleChange}
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
      <GoogleAutoCompleteExample
        parentCallBack={(address, type) => setSourceDest(address, type)}
        errorTo={errorTo}
        errorFrom={errorFrom}
      />
      <div className="form-group row">
        <div className="col-sm-4"></div>
        <div className="col-sm-8 custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="roundTrip"
            name="roundTrip"
            onChange={handleRoundTrip}
            ref={register({ required: false })}
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
        <label htmlFor="assignedTo" className="col-sm-4 col-form-label">
          Assigned To
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            className={classnames("form-control", {
              "is-invalid": errors.assignedTo,
            })}
            placeholder="Enter Officer Assigned To"
            name="assignedTo"
            id="assignedTo"
            ref={register({ required: false })}
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Generated Token :</label>
        <div className="input-group col-sm-8">
          {generatedToken && <label style={{fontFamily: "sans-serif", paddingTop: "9px"}}>{generatedToken}</label>}
        </div>
      </div>
      <div className="form-group row">
        <div className="input-group col-12">
          <button type="submit" name="finalSubmit" className="btn btn-success">
            Create Trip
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateTripForm;
