import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className='hold-transition login-page'>
      <div className='login-box'>
        <div className='login-logo'>
          <Link to='/'>
            <b>Welcome !</b> Please Login
          </Link>
        </div>
        <div className='card'>
          <div className='card-body login-card-body'>
            <p className='login-box-msg'>Sign in to start your session</p>
            <LoginForm />
            <p className='mb-1'>
              <Link to='/'>I forgot my password</Link>
            </p>
            <a
              href='https://store.guwahatipolicemto.in/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Go To Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
