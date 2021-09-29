import React, { useState } from "react";
import "../styles/Navbar.scss";
import Input from "./Input";
import UserDropdown from "./UserDropdown";
import LoginButton from "./LoginButton";
import { AddOutline } from "react-ionicons";
import Logo from "../icons/logo.png";
import { Box } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";


const Navbar = () => {

    const [loginOpen, setLoginOpen] = useState(true)
    const [signUpOpen, setSignupOpen] = useState(false)
   
const openLogin = () => {
    setLoginOpen(true)
}

const openSignup = () => {
    setSignupOpen(true)
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
      <LoginButton buttonText="Log in" isLogin={true} />
      <LoginButton buttonText="Sign Up" isLogin={false} />
      </div>
      
      <UserDropdown />

      <ModalUnstyled
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
      >
        <Box className="modal">
          <h2 id="unstyled-modal-title">Text in a modal</h2>
        </Box>
      </ModalUnstyled>
    </div>
  );
};

export default Navbar;
