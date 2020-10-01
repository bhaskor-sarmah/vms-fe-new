import React, { Fragment } from "react";
import { roleWiseRoutes } from "./RoleWiseRoutes";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const UserLinks = ({ userDetails }) => {
  const list = roleWiseRoutes.filter((obj) => obj.role === userDetails.role);
  const finalList = list[0].routes.map((r) => {
    // console.log(r);
    return (
      <li className='nav-item' key={r.id}>
        <Link to={r.route} className='nav-link'>
          <i className={`nav-icon ${r.icon}`} />
          <p>{r.name}</p>
        </Link>
      </li>
    );
  });
  //   console.log(finalList);
  return <Fragment>{finalList}</Fragment>;
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.security.user.user,
  };
};

export default connect(mapStateToProps)(UserLinks);
