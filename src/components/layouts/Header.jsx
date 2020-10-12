import React from "react";
import { connect } from "react-redux";
import { logout } from "../../store/actions/securityActions";

const Header = (props) => {
  // const [searchText, setSearchText] = useState("");

  const handleOnSearch = (e) => {
    e.preventDefault();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    props.logout();
    // props.history.push("/");
  };
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
      <form className='form-inline ml-3' onSubmit={handleOnSearch}>
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
            href='logout'
            onClick={handleLogout}
            role='button'
          >
            <i className='nav-icon fas fa-sign-out-alt' /> Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default connect(null, { logout })(Header);
