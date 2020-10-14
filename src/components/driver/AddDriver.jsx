import React, { Component, useEffect } from "react";
import classnames from "classnames";
import {
  addNewDrivers,
  resetAddDriverError,
} from "../../store/actions/driverActions";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { resetNotification } from "../../store/actions/globalDispatch";

// This page is done using old react lifecycle
// hooks and doesnot implements react V16+ hooks
const AddDriver = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const dispatch = useDispatch();

  const addDriverLoading = useSelector(
    (state) => state.driver.addDriverLoading
  );

  const addDriverError = useSelector((state) => state.driver.addDriverError);
  const successAddDriver = useSelector((state) => state.notification.message);

  const onSubmit = (data) => {
    data.role_id = 9;
    // console.log(data);
    dispatch(addNewDrivers(data));
  };

  useEffect(() => {
    if (addDriverError) {
      NotificationManager.error(addDriverError, "Error", 3000);
    }
  }, [dispatch, addDriverError]);

  useEffect(() => {
    if (successAddDriver) {
      NotificationManager.success(successAddDriver, "Success", 3000);
      dispatch(resetNotification());
    }
  }, [dispatch, successAddDriver]);

  return (
    <div
      className='tab-pane fade show active'
      id='addDriver'
      role='tabpanel'
      aria-labelledby='Add Driver'
    >
      {addDriverLoading ? (
        <div className='card'>
          <div className='card-body col-8'>
            <h3>Adding new Driver...</h3>
          </div>
        </div>
      ) : (
        <div className='card'>
          <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <div className='card-body col-8'>
              {addDriverError && (
                <div className='row'>
                  <div className='col-12'>
                    <span className='text-danger'>
                      Error ! Please check that the mobile no and username
                      provided are unique
                    </span>
                  </div>
                </div>
              )}
              <div className='row'>
                <div className='col-12 col-md-6 '>
                  <div className='form-group'>
                    <label htmlFor='name'>Driver Name</label>
                    <input
                      type='text'
                      name='name'
                      className={classnames("form-control", {
                        "is-invalid": errors.name,
                      })}
                      id='name'
                      placeholder='Enter Driver Name'
                      ref={register({ required: true })}
                    />
                    {errors.name && errors.name.type === "required" && (
                      <span role='alert' className='text-danger'>
                        Please enter driver name
                      </span>
                    )}
                  </div>
                </div>
                <div className='col-12 col-md-6 '>
                  <div className='form-group'>
                    <label htmlFor='drivingLicenceNo'>Driver License No</label>
                    <input
                      type='text'
                      name='drivingLicenceNo'
                      className={classnames("form-control", {
                        "is-invalid": errors.drivingLicenceNo,
                      })}
                      id='drivingLicenceNo'
                      placeholder='Enter Driver License No'
                      ref={register({ required: true })}
                    />
                    {errors.name && errors.name.type === "required" && (
                      <span role='alert' className='text-danger'>
                        Please enter driver license no
                      </span>
                    )}
                  </div>
                </div>
                <div className='col-12 col-md-6 '>
                  <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <input
                      type='text'
                      name='username'
                      className={classnames("form-control", {
                        "is-invalid": errors.username,
                      })}
                      id='username'
                      placeholder='Enter Username'
                      ref={register({ required: true, minLength: 5 })}
                    />
                    {errors.username && errors.username.type === "required" && (
                      <span role='alert' className='text-danger'>
                        Username is required
                      </span>
                    )}
                    {errors.username && errors.username.type === "minLength" && (
                      <span role='alert' className='text-danger'>
                        Username must be atleast 5 characters long
                      </span>
                    )}
                  </div>
                </div>
                <div className='col-12 col-md-6 '>
                  <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                      type='password'
                      name='password'
                      className={classnames("form-control", {
                        "is-invalid": errors.password,
                      })}
                      id='password'
                      placeholder='Enter Password'
                      ref={register({ required: true, minLength: 8 })}
                    />
                    {errors.password && errors.password.type === "required" && (
                      <span role='alert' className='text-danger'>
                        Password is required
                      </span>
                    )}
                    {errors.password && errors.password.type === "minLength" && (
                      <span role='alert' className='text-danger'>
                        Password must be atleast 8 characters long
                      </span>
                    )}
                  </div>
                </div>
                <div className='col-12 col-md-6 '>
                  <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                      type='email'
                      name='email'
                      placeholder='Enter Email ID'
                      className={classnames("form-control", {
                        "is-invalid": errors.email,
                      })}
                      id='email'
                      ref={register({ required: false })}
                    />
                    {/* {errors.email && errors.email.type === "required" && (
                      <span role='alert' className='text-danger'>
                        Password is required
                      </span>
                    )} */}
                  </div>
                </div>
                <div className='col-12 col-md-6 '>
                  <div className='form-group'>
                    <label htmlFor='mobile'>Driver Mobile</label>
                    <input
                      type='number'
                      name='mobile'
                      className={classnames("form-control", {
                        "is-invalid": errors.mobile,
                      })}
                      id='mobile'
                      placeholder='Enter Driver Mobile'
                      ref={register({
                        required: true,
                        min: 1000000000,
                        max: 9999999999,
                        maxLength: 10,
                      })}
                    />
                    {errors.mobile && errors.mobile.type === "required" && (
                      <span role='alert' className='text-danger'>
                        Driver Mobile is required
                      </span>
                    )}
                    {errors.mobile &&
                      (errors.mobile.type === "min" ||
                        errors.mobile.type === "max") && (
                        <span role='alert' className='text-danger'>
                          Enter a valid Driver Mobile
                        </span>
                      )}
                    {errors.mobile && errors.mobile.type === "maxLength" && (
                      <span role='alert' className='text-danger'>
                        Enter 10 digit Driver Mobile
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='card-footer'>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddDriver;
