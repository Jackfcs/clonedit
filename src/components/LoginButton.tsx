import React, { useState } from "react";
import "../styles/LoginButton.scss";
import { Box } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";

interface Props {
  buttonText: string;
  isLogin: boolean;
}

const LoginButton: React.FC<Props> = ({ buttonText, isLogin }) => {


  let currentButton;

  if (isLogin) {
    currentButton = (
      <button onClick={() => console.log('hi')} className="log-in button">
        {buttonText}
      </button>
    );
  } else {
    currentButton = (
      <button onClick={() => console.log('hi')} className="sign-up button">
        {buttonText}
      </button>
    );
  }
  return (
    <div>
      {currentButton}
      
    </div>
  );
};

export default LoginButton;
