import React from "react";
import { Link } from "react-router-dom";
import UserImage from "../../assets/image/user2-160x160.jpg";
import { logout } from "../../store/actions/securityActions";
import { connect } from "react-redux";
import UserLinks from "../routes/UserLinks";

const Menu = (props) => {
  const handleLogout = (e) => {
    e.preventDefault();
    props.logout();
    // props.history.push("/");
  };
  return (
    <aside className='main-sidebar sidebar-dark-primary elevation-4'>
      {/* Sidebar */}
      <div className='sidebar'>
        {/* Sidebar user panel (optional) */}
        <div className='user-panel mt-3 pb-3 mb-3 d-flex'>
          <div className='image'>
            <img
              src={UserImage}
              className='img-circle elevation-2'
              alt='User'
            />
          </div>
          <div className='info'>
            <a href='url' className='d-block'>
              User Home
            </a>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className='mt-2'>
          <ul
            className='nav nav-pills nav-sidebar flex-column'
            data-widget='treeview'
            role='menu'
            data-accordion='false'
          >
            <li className='nav-item'>
              <Link to='/dashboard' className='nav-link'>
                <i className='nav-icon fas fa-home' />
                <p>Home</p>
              </Link>
            </li>
            <UserLinks />
            <li className='nav-header'>USER MANAGEMENT</li>
            <li className='nav-item'>
              <Link to='/forgot-password' className='nav-link'>
                <i className='nav-icon fas fa-unlock-alt' />
                <p>Change Password</p>
              </Link>
            </li>
            <li className='nav-item'>
              <a href='logout' className='nav-link' onClick={handleLogout}>
                <i className='nav-icon fas fa-sign-out-alt' />
                <p>Logout</p>
              </a>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
};

export default connect(null, { logout })(Menu);
