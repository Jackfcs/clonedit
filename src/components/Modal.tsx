import React from "react";
import { Box } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import LoginImage from "../icons/loginimage.png";
import "../styles/Modal.scss";
import LoginButton from "./LoginButton";

interface Props {
  open: boolean;
  close: () => void;
  isLogin: boolean;
}

const Modal: React.FC<Props> = ({ open, close, isLogin }) => {
  let modalContent;

  if (isLogin) {
    modalContent = (
      <div className="input-container">
        <div>Login</div>
        <p className="smaller-text">By continuing, you agree to our User Agreement and Privacy Policy. </p>
        <input></input>
        <input></input>
        <LoginButton width={{width: "300px"}} buttonText="Login"/>

      </div>
    );
  } else {
    modalContent = (
      <div className="input-container">
          
        <input></input>
        <input></input>
        <input></input>
        <div>Sign me up</div>
      </div>
    );
  }

  return (
    <div>
      <ModalUnstyled open={open}>
        <Box className="bg">
          <div className="modal">
            <img className="image-dec" src={LoginImage} alt="decorative"></img>
            <button className="close-button" onClick={close}>
              &times;
            </button>
            <div>
                {modalContent}  
                </div>   
          </div>

        </Box>
      </ModalUnstyled>
    </div>
  );
};

export default Modal;
