import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { login } from "../../store/actions/securityActions";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.security.validToken) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  // static getDerivedStateFromProps(nextProps) {
  //   if (nextProps.security.validToken) {
  //     this.props.history.push("/dashboard");
  //   }

  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch Action for Login
    this.props.login(this.state);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='input-group mb-3'>
          <div className='input-group-prepend'>
            <span
              className='input-group-text'
              style={{ borderLeft: "1px solid lightgrey" }}
            >
              <span className='fas fa-user' />
            </span>
          </div>
          <input
            type='username'
            name='username'
            className='form-control'
            placeholder='Username'
            value={this.state.username}
            onChange={this.handleChange}
            style={{ borderRight: "1px solid lightgrey" }}
          />
        </div>
        <div className='input-group mb-3'>
          <div className='input-group-prepend'>
            <div
              className='input-group-text'
              style={{ borderLeft: "1px solid lightgrey" }}
            >
              <span className='fas fa-lock' />
            </div>
          </div>
          <input
            type='password'
            name='password'
            className='form-control'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handleChange}
            autoComplete='off'
            style={{ borderRight: "1px solid lightgrey" }}
          />
        </div>
        {this.state.errors.authError && (
          <div
            className='alert alert-danger'
            role='alert'
            style={{
              backgroundColor: "#f8d7da",
              color: "#A94442",
              border: "1px solid #EBCCD1",
            }}
          >
            {this.state.errors.authError}
          </div>
        )}
        <div className='row'>
          <div className='col-12 text-center'>
            <button type='submit' className='btn btn-primary btn-block'>
              {this.props.security.userLoading ? "Signing In" : "Sign In"}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors,
});

export default connect(mapStateToProps, { login })(LoginForm);
