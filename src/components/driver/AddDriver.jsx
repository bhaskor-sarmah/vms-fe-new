import React, { Component } from "react";
import classnames from "classnames";
import ShowError from "../utils/ShowError";
import { connect } from "react-redux";
import { addNewDrivers } from "../../store/actions/driverActions";

// This page is done using old react lifecycle
// hooks and doesnot implements react V16+ hooks
class AddDriver extends Component {
  constructor() {
    super();
    this.state = {
      formdata: {
        name: "",
        username: "",
        password: "",
        mobile: "",
        role_id: 9,
        email: "",
        drivingLicenceNo: "",
      },
      errors: {},
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // console.log(this.state.formdata);
    // Add the role id during save
    this.props.addNewDrivers(this.state.formdata);
  };
  handleChange = (e) => {
    this.setState({
      ...this.state,
      formdata: {
        ...this.state.formdata,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    const { errors, formdata } = this.state;
    return (
      <div
        className='tab-pane fade show active'
        id='addDriver'
        role='tabpanel'
        aria-labelledby='Add Driver'
      >
        {this.props.addDriverLoading ? (
          <div className='card'>
            <div className='card-body col-8'>
              <h3>Saving Driver...</h3>
            </div>
          </div>
        ) : (
          <div className='card'>
            <form autoComplete='off' onSubmit={this.handleSubmit}>
              <div className='card-body col-8'>
                {/* Show Error if present */}
                {this.props.addDriverError && (
                  <div className='row'>
                    <div className='col-12 '>
                      <div
                        className='alert alert-danger'
                        role='alert'
                        style={{
                          backgroundColor: "#f8d7da",
                          color: "#A94442",
                          border: "1px solid #EBCCD1",
                        }}
                      >
                        {this.props.addDriverError}
                        <span style={{ fontSize: "x-small" }}>
                          <br />
                          Please check following
                          <ul>
                            <li>Username already present</li>
                            <li>Mobile No already present</li>
                            <li>Username less than 5 characters</li>
                            <li>Password less than 8 characters</li>
                          </ul>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {/* End Show error */}
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
                        aria-describedby='name-error'
                        aria-invalid='true'
                        required
                        value={formdata.name}
                        onChange={this.handleChange}
                      />
                      <ShowError errors={errors} name='name' />
                    </div>
                  </div>
                  <div className='col-12 col-md-6 '>
                    <div className='form-group'>
                      <label htmlFor='drivingLicenceNo'>
                        Driver License No
                      </label>
                      <input
                        type='text'
                        name='drivingLicenceNo'
                        className={classnames("form-control", {
                          "is-invalid": errors.drivingLicenceNo,
                        })}
                        id='drivingLicenceNo'
                        placeholder='Enter Driver License No'
                        aria-describedby='drivingLicenceNo-error'
                        aria-invalid='true'
                        required
                        value={formdata.drivingLicenceNo}
                        onChange={this.handleChange}
                      />
                      <ShowError errors={errors} name='drivingLicenceNo' />
                    </div>
                  </div>
                  <div className='col-12 col-md-6 '>
                    <div className='form-group'>
                      <label htmlFor='username'>Username</label>
                      <input
                        type='username'
                        name='username'
                        className={classnames("form-control", {
                          "is-invalid": errors.username,
                        })}
                        id='username'
                        placeholder='Enter Username'
                        aria-describedby='username-error'
                        aria-invalid='true'
                        value={formdata.username}
                        onChange={this.handleChange}
                      />
                      <ShowError errors={errors} name='username' />
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
                        aria-describedby='password-error'
                        aria-invalid='true'
                        autoComplete='off'
                        required
                        value={formdata.password}
                        onChange={this.handleChange}
                      />
                      <ShowError errors={errors} name='password' />
                    </div>
                  </div>
                  <div className='col-12 col-md-6 '>
                    <div className='form-group'>
                      <label htmlFor='email'>Email</label>
                      <input
                        type='email'
                        name='email'
                        className={classnames("form-control", {
                          "is-invalid": errors.email,
                        })}
                        id='email'
                        placeholder='Enter Driver Email'
                        aria-describedby='email-error'
                        aria-invalid='true'
                        value={formdata.email}
                        onChange={this.handleChange}
                      />
                      <ShowError errors={errors} name='email' />
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
                        aria-describedby='mobile-error'
                        aria-invalid='true'
                        required
                        value={formdata.mobile}
                        onChange={this.handleChange}
                      />
                      <ShowError errors={errors} name='mobile' />
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
  }
}

export default connect(
  (state) => ({
    addDriverError: state.errors.addDriverError,
    addDriverLoading: state.driver.addDriverLoading,
  }),
  { addNewDrivers }
)(AddDriver);
