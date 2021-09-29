import React, { useState } from "react";
import "../styles/LoginButton.scss";

interface Props {
  buttonText: string;
  isLogin: boolean;
  openLogin: () => void;
  openSignup: () => void;
}

const LoginButton: React.FC<Props> = ({ buttonText, isLogin, openLogin, openSignup }) => {


  let currentButton;

  if (isLogin) {
    currentButton = (
      <button onClick={openLogin} className="log-in button">
        {buttonText}
      </button>
    );
  } else {
    currentButton = (
      <button onClick={openSignup} className="sign-up button">
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
