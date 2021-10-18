import React from "react";
import "../styles/Navbar.scss";
import Input from "./Input";
import UserDropdown from "./UserDropdown";
import LoginButton from "./LoginButton";
import { AddOutline } from "react-ionicons";
import Logo from "../icons/logo.png";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  openLogin: () => void;
  openSignup: () => void;
  closeLogin: () => void;
  closeSignup: () => void;
  loginOpen: boolean;
  signupOpen: boolean
}

const Navbar: React.FC<Props> = ({openLogin, openSignup, closeLogin, closeSignup, loginOpen, signupOpen}) => {

  const { currentUser } = useAuth();

  return (
    <div className="navbar-container">
      <div className="logo-container">
        <Link style={{textDecoration: 'none'}} to="/">
        <img className="main-logo" src={Logo} alt="Reddit logo"></img> reddit
        </Link>
      </div>
      
      <Input placeHolder="Search Reddit" />
      <Link to="/submit-post">
      <AddOutline
        color={"#6D6D6E"}
        height="28px"
        width="28px"
        cssClasses="add-post-cross"
      />
      </Link>
      {!currentUser && (<div className="buttons">
      <LoginButton width={{width: "120px"}} openLogin={openLogin} openSignup={openSignup} buttonText="Log in" isLogin={true} />
      <LoginButton width={{width: "120px"}} openLogin={openLogin} openSignup={openSignup} buttonText="Sign Up" isLogin={false} />
      </div>)}
      
      
      <UserDropdown openLogin={openLogin} />

      <Modal  isLogin={true} open={loginOpen} closeModal={closeLogin} openModal={openSignup}/>
      <Modal  isLogin={false} open={signupOpen} closeModal={closeSignup} openModal={openLogin} />


    </div>
  );
};

export default Navbar;
