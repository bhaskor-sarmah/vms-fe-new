import React from "react";

const Header = () => {
  return (
    <nav className='main-header navbar navbar-expand navbar-white navbar-light'>
      {/* Left navbar links */}
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <a
            className='nav-link'
            data-widget='pushmenu'
            href='url'
            role='button'
          >
            <i className='fas fa-bars' />
          </a>
        </li>
      </ul>
      {/* SEARCH FORM */}
      <form className='form-inline ml-3'>
        <div className='input-group input-group-sm'>
          <input
            className='form-control form-control-navbar'
            type='search'
            placeholder='Search'
            aria-label='Search'
          />
          <div className='input-group-append'>
            <button className='btn btn-navbar' type='submit'>
              <i className='fas fa-search' />
            </button>
          </div>
        </div>
      </form>
      {/* Right navbar links */}
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <a
            className='nav-link'
            data-widget='control-sidebar'
            data-slide='true'
            href='url'
            role='button'
          >
            <i className='fas fa-sign-out' /> Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
