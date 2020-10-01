import React from "react";
import UserImage from "../../assets/image/user2-160x160.jpg";

const Menu = () => {
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
            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
            <li className='nav-item'>
              <a href='pages/widgets.html' className='nav-link'>
                <i className='nav-icon fas fa-th' />
                <p>Dashboard</p>
              </a>
            </li>
            <li className='nav-item'>
              <a href='pages/widgets.html' className='nav-link'>
                <i className='nav-icon fas fa-th' />
                <p>Trip</p>
              </a>
            </li>
            <li className='nav-item'>
              <a href='pages/widgets.html' className='nav-link'>
                <i className='nav-icon fas fa-th' />
                <p>Token</p>
              </a>
            </li>
            <li className='nav-header'>USER MANAGEMENT</li>
            <li className='nav-item'>
              <a href='pages/calendar.html' className='nav-link'>
                <i className='nav-icon fas fa-calendar-alt' />
                <p>Change Password</p>
              </a>
            </li>
            <li className='nav-item'>
              <a href='pages/calendar.html' className='nav-link'>
                <i className='nav-icon fas fa-calendar-alt' />
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

export default Menu;
