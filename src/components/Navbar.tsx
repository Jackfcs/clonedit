import React, { useState } from "react";
import "../styles/Navbar.scss";
import Input from "./Input";
import UserDropdown from "./UserDropdown";
import LoginButton from "./LoginButton";
import { AddOutline } from "react-ionicons";
import Logo from "../icons/logo.png";
import { Box } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import LoginImage from "../icons/loginimage.png";


const Navbar = () => {

    const [loginOpen, setLoginOpen] = useState(false)
    const [signUpOpen, setSignupOpen] = useState(false)
   
const openLogin = () => {
    setLoginOpen(true);
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
      <LoginButton openLogin={openLogin} openSignup={openSignup} buttonText="Log in" isLogin={true} />
      <LoginButton openLogin={openLogin} openSignup={openSignup} buttonText="Sign Up" isLogin={false} />
      </div>
      
      <UserDropdown />

      <ModalUnstyled
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
      >
        <Box className="bg">
        <div className="modal">
          <img className="image-dec" src={LoginImage} alt="decorative"></img>
          <div>
            <h2>Log in</h2>
            <button onClick={() => setLoginOpen(false)}>close</button>
          </div>
          </div>
        </Box>
      </ModalUnstyled>

      <ModalUnstyled
        open={signUpOpen}
        onClose={() => setSignupOpen(false)}
      >
        <Box className="bg">
          <div className="modal">
          <img className="image-dec" src={LoginImage} alt="decorative"></img>
          <div>
            <h2>Sign Up</h2>
          </div>
          
          </div>
        </Box>
      </ModalUnstyled>

    </div>
  );
};

export default Navbar;
