import React, { useState } from "react";
import "../styles/LoginButton.scss";

interface Props {
  buttonText: string;
  isLogin?: boolean;
  openLogin?: () => void;
  openSignup?: () => void;
  width: Style;
}

interface Style {
  width: string;
}

const LoginButton: React.FC<Props> = ({ buttonText, isLogin, openLogin, openSignup, width }) => {


  let currentButton;

  if (isLogin) {
    currentButton = (
      <button style={width} onClick={openLogin} className="log-in button">
        {buttonText}
      </button>
    );
  } else {
    currentButton = (
      <button style={width} onClick={openSignup} className="sign-up button">
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
