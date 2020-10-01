import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Fragment>
      <div className='content-header'>
        <div className='container-fluid'>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <h1 className='m-0 text-dark'>Dashboard</h1>
            </div>
            {/* /.col */}
            <div className='col-sm-6'>
              <ol className='breadcrumb float-sm-right'>
                <li className='breadcrumb-item'>Dashboard</li>
                <li className='breadcrumb-item active'>
                  <Link to='/'>Home</Link>
                </li>
              </ol>
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <div className='content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-6'></div>
            {/* /.col-md-6 */}
            <div className='col-lg-6'></div>
            {/* /.col-md-6 */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
    </Fragment>
  );
};

export default Home;
