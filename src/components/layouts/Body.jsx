import React from "react";

const Body = () => {
  return (
    <div className='content-wrapper'>
      {/* Content Header (Page header) */}
      <div className='content-header'>
        <div className='container-fluid'>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <h1 className='m-0 text-dark'>Dashboard v3</h1>
            </div>
            {/* /.col */}
            <div className='col-sm-6'>
              <ol className='breadcrumb float-sm-right'>
                <li className='breadcrumb-item'>
                  <a href='url'>Home</a>
                </li>
                <li className='breadcrumb-item active'>Dashboard v3</li>
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
      {/* /.content */}
    </div>
  );
};

export default Body;
