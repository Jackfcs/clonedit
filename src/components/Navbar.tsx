import React, { useState } from "react";
import "../styles/Navbar.scss";
import Input from "./Input";
import UserDropdown from "./UserDropdown";
import LoginButton from "./LoginButton";
import { AddOutline } from "react-ionicons";
import Logo from "../icons/logo.png";


const Navbar = () => {


  return (
    <div className="navbar-container">
      <div className="logo-container">
        <img className="main-logo" src={Logo} alt="Reddit logo"></img> reddit
      </div>
      
      <Input placeHolder="Search Reddit" />
      <AddOutline
        color={"#6D6D6E"}
        height="28px"
        width="28px"
        cssClasses="add-post-cross"
      />
      <div className="buttons">
      <LoginButton buttonText="Log in" isLogin={true} />
      <LoginButton buttonText="Sign Up" isLogin={false} />
      </div>
      
      <UserDropdown />

    </div>
  );
};

export default Navbar;
