import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { roleWiseRoutes } from "./RoleWiseRoutes";
import Home from "../layouts/Home";

const UserRoutes = ({ userDetails, ...restProps }) => {
  const list = roleWiseRoutes.filter((obj) => obj.role === userDetails.role);
  const finalRoutes = list[0].routes.map((r) => {
    // console.log(r);
    return (
      <Route
        {...restProps}
        exact
        path={r.route}
        key={r.id}
        render={(props) => <r.component {...props} height='100%' />}
      />
    );
  });
  return (
    <Switch>
      {finalRoutes}
      <Route component={() => <Home {...restProps} />} />
    </Switch>
  );
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.security.user.user,
  };
};

export default connect(mapStateToProps)(UserRoutes);
