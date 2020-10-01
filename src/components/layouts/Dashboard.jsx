import React, { Fragment } from "react";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";
import RightMenu from "./RightMenu";

const Dashboard = () => {
  return (
    <Fragment>
      <div className='wrapper'>
        <Header />
        <Menu />
        <Body />
        {/* <RightMenu /> */}
        <Footer />
      </div>
    </Fragment>
  );
};

export default Dashboard;
