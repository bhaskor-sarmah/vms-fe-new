import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import {
  addNewVehicles,
  resetAddVehicleError,
} from "../../store/actions/vehicleActions";
import { useEffect } from "react";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { resetNotification } from "../../store/actions/globalDispatch";

const AddVehicleForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const dispatch = useDispatch();

  const categoryLoading = useSelector(
    (state) => state.vehicle.getVehicleCategoryLoading
  );
  const typeLoading = useSelector(
    (state) => state.vehicle.getVehicleTypeLoading
  );
  const fuelLoading = useSelector(
    (state) => state.vehicle.getVehicleFuelTypeLoading
  );
  const addVehicleLoading = useSelector(
    (state) => state.vehicle.addVehicleLoading
  );
  const categoryList = useSelector(
    (state) => state.vehicle.vehicleCategoryList
  );
  const addVehicleSuccess = useSelector((state) => state.notification.message);
  const addVehicleError = useSelector((state) => state.vehicle.addVehicleError);
  const fuelList = useSelector((state) => state.vehicle.vehicleFuelTypeList);
  const typeList = useSelector((state) => state.vehicle.vehicleTypeList);

  const onSubmit = (data) => {
    dispatch(addNewVehicles(data));
  };

  useEffect(() => {
    if (addVehicleSuccess) {
      NotificationManager.success(addVehicleSuccess, "Success", 3000);
      dispatch(resetNotification());
    }
  }, [dispatch, addVehicleSuccess]);

  useEffect(() => {
    if (addVehicleError) {
      NotificationManager.error(addVehicleError, "Error", 3000);
      dispatch(resetAddVehicleError());
    }
  }, [dispatch, addVehicleError]);

  // Custom Validation
  const vehicleList = useSelector((state) => state.vehicle.vehicleList);
  const uniqueVehicle = (data) => {
    const res = vehicleList.filter((v) => v.regNo === data);
    console.log(res);
    if (res.length) {
      return false;
    }
    return true;
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <div className='card-title'>Add New Vehicle</div>
      </div>
      {categoryLoading || typeLoading || fuelLoading ? (
        // if loading
        <div className='card-body'>
          <h3>Loading...</h3>
        </div>
      ) : addVehicleLoading ? (
        <div className='card-body'>
          <h3>Adding New Vehicle...</h3>
        </div>
      ) : (
        // No Loading No Errors
        <form className='form-horizontal' onSubmit={handleSubmit(onSubmit)}>
          <div className='card-body col-7'>
            <div className='form-group row'>
              <label
                htmlFor='vehicleRegistrationNo'
                className='col-sm-4 col-form-label'
              >
                Vehicle Registration No.
              </label>
              <div className='col-sm-8'>
                <input
                  type='text'
                  className={classnames("form-control", {
                    "is-invalid": errors.vehicleRegistrationNo,
                  })}
                  placeholder='Eg- AS 01 BB 3456'
                  name='vehicleRegistrationNo'
                  id='vehicleRegistrationNo'
                  ref={register({
                    required: true,
                    pattern: /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/i,
                    validate: uniqueVehicle,
                  })}
                />
                {errors.vehicleRegistrationNo &&
                  errors.vehicleRegistrationNo.type === "required" && (
                    <span role='alert' className='text-danger'>
                      Please enter vehicle registration no
                    </span>
                  )}
                {errors.vehicleRegistrationNo &&
                  errors.vehicleRegistrationNo.type === "pattern" && (
                    <span role='alert' className='text-danger'>
                      Please enter a valid vehicle registration no
                    </span>
                  )}
                {errors.vehicleRegistrationNo &&
                  errors.vehicleRegistrationNo.type === "validate" && (
                    <span role='alert' className='text-danger'>
                      Vehicle registration no already present
                    </span>
                  )}
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='categoryId' className='col-sm-4 col-form-label'>
                Select Category
              </label>
              <div className='col-sm-8'>
                <select
                  defaultValue={""}
                  className={classnames("custom-select", {
                    "is-invalid": errors.categoryId,
                  })}
                  name='categoryId'
                  id='categoryId'
                  ref={register({ required: true })}
                >
                  <option value=''>---SELECT---</option>
                  {categoryList &&
                    categoryList
                      .sort((a, b) => a.catogoryName > b.catogoryName)
                      .map((catogory, i) => (
                        <option key={i} value={catogory.id}>
                          {catogory.catogoryName}
                        </option>
                      ))}
                </select>
                {errors.categoryId && errors.categoryId.type === "required" && (
                  <span role='alert' className='text-danger'>
                    Please select Category
                  </span>
                )}
              </div>
            </div>
            <div className='form-group row'>
              <label
                htmlFor='vehicleTypeId'
                className='col-sm-4 col-form-label'
              >
                Select Vehicle Type
              </label>
              <div className='col-sm-8'>
                <select
                  defaultValue={""}
                  className={classnames("custom-select", {
                    "is-invalid": errors.vehicleTypeId,
                  })}
                  name='vehicleTypeId'
                  id='vehicleTypeId'
                  ref={register({ required: true })}
                >
                  <option value=''>---SELECT---</option>
                  {typeList &&
                    typeList
                      .sort((a, b) => a.vehicleType > b.vehicleType)
                      .map((vehicleType, i) => (
                        <option key={i} value={vehicleType.vehicleTypeId}>
                          {vehicleType.vehicleType}
                        </option>
                      ))}
                </select>
                {errors.vehicleTypeId &&
                  errors.vehicleTypeId.type === "required" && (
                    <span role='alert' className='text-danger'>
                      Please select vehicle type
                    </span>
                  )}
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='fuelType' className='col-sm-4 col-form-label'>
                Select Fuel Type
              </label>
              <div className='col-sm-8'>
                <select
                  defaultValue={""}
                  className={classnames("custom-select", {
                    "is-invalid": errors.fuelType,
                  })}
                  name='fuelType'
                  id='fuelType'
                  ref={register({ required: true })}
                >
                  <option value=''>---SELECT---</option>
                  {fuelList &&
                    fuelList
                      .sort((a, b) => a.type > b.type)
                      .map((fuelType, i) => (
                        <option key={i} value={fuelType.id}>
                          {fuelType.type}
                        </option>
                      ))}
                </select>
                {errors.fuelType && errors.fuelType.type === "required" && (
                  <span role='alert' className='text-danger'>
                    Please select fuel type
                  </span>
                )}
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='milage' className='col-sm-4 col-form-label'>
                Enter Milage
                <p style={{ fontSize: "x-small", marginBottom: "0" }}>
                  (in Ltrs)
                </p>
              </label>
              <div className='col-sm-8'>
                <input
                  type='number'
                  step='.01'
                  className={classnames("form-control", {
                    "is-invalid": errors.milage,
                  })}
                  placeholder='Enter Milage in Ltrs'
                  name='milage'
                  id='milage'
                  ref={register({ required: true, min: 0 })}
                />
                {errors.milage && errors.milage.type === "required" && (
                  <span role='alert' className='text-danger'>
                    Please enter Milage in Ltrs
                  </span>
                )}
                {errors.milage && errors.milage.type === "min" && (
                  <span role='alert' className='text-danger'>
                    Milage cannot be less than 0.
                  </span>
                )}
              </div>
            </div>
            <div className='form-group row'>
              <label htmlFor='modelName' className='col-sm-4 col-form-label'>
                Model Name
              </label>
              <div className='col-sm-8'>
                <input
                  type='text'
                  className={classnames("form-control", {
                    "is-invalid": errors.modelName,
                  })}
                  placeholder='Enter Vehicle Model'
                  name='modelName'
                  id='modelName'
                  ref={register({ required: true })}
                />
                {errors.modelName && errors.modelName.type === "required" && (
                  <span role='alert' className='text-danger'>
                    Please enter model name
                  </span>
                )}
              </div>
            </div>
            <div className='form-group row'>
              <label
                htmlFor='ownerMobileNumber'
                className='col-sm-4 col-form-label'
              >
                Owner Mobile No
              </label>
              <div className='col-sm-8'>
                <input
                  type='number'
                  className={classnames("form-control", {
                    "is-invalid": errors.ownerMobileNumber,
                  })}
                  placeholder='Enter Owner Mobile No'
                  name='ownerMobileNumber'
                  id='ownerMobileNumber'
                  ref={register({
                    required: false,
                    min: 1000000000,
                    max: 9999999999,
                  })}
                />
                {errors.ownerMobileNumber && (
                  <span role='alert' className='text-danger'>
                    Please enter valid mobile no
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className='card-footer text-center col-7'>
            <button type='submit' className='btn btn-info'>
              Add Vehicle
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddVehicleForm;
