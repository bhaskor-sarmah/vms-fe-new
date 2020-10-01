import React, { Fragment } from "react";
import "./App.css";
import Body from "./components/layouts/Body";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Login from "./components/layouts/Login";
import Menu from "./components/layouts/Menu";
import RightMenu from "./components/layouts/RightMenu";

function App() {
  return (
    <Fragment>
      {/* <div className='wrapper'>
        <Header />
        <Menu />
        <Body />
        <RightMenu />
        <Footer />
      </div> */}
      <Login />
    </Fragment>
  );
}

export default App;
