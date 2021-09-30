import React, { useState } from "react";
import "../styles/Navbar.scss";
import Input from "./Input";
import UserDropdown from "./UserDropdown";
import LoginButton from "./LoginButton";
import { AddOutline } from "react-ionicons";
import Logo from "../icons/logo.png";
import Modal from "./Modal"
import { Box } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import LoginImage from "../icons/loginimage.png";


const Navbar = () => {

    const [loginOpen, setLoginOpen] = useState(false)
    const [signupOpen, setSignupOpen] = useState(false)
   
const openLogin = () => {
    setLoginOpen(true);
}

const closeLogin = () => {
  setLoginOpen(false);
}

const openSignup = () => {
    setSignupOpen(true)
} 

const closeSignup = () => {
  setSignupOpen(false)
}

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
      <LoginButton openLogin={openLogin} openSignup={openSignup} buttonText="Log in" isLogin={true} />
      <LoginButton openLogin={openLogin} openSignup={openSignup} buttonText="Sign Up" isLogin={false} />
      </div>
      
      <UserDropdown />

      <Modal isLogin={true} open={loginOpen} close={closeLogin} header={"Log in"} />
      <Modal isLogin={false} open={signupOpen} close={closeSignup} header={"Sign Up"} />


    </div>
  );
};

export default Navbar;
