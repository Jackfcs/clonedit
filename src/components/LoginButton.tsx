import React from "react";
import "../styles/LoginButton.scss";
import ModalUnstyled from "@mui/core/ModalUnstyled";

interface Props {
  buttonText: string;
  isLogin: boolean;
}

const LoginButton: React.FC<Props> = ({ buttonText, isLogin }) => {
  const displayLogin = () => {
    console.log("hi");
  };

  const displaySignup = () => {
    console.log("signup");
  };

  let currentButton;

  if (isLogin) {
    currentButton = (
      <button onClick={displayLogin} className="log-in button">
        {buttonText}
      </button>
    );
  } else {
    currentButton = (
      <button onClick={displaySignup} className="sign-up button">
        {buttonText}
      </button>
    );
  }
  return (
    <div>
      {currentButton}
      <ModalUnstyled
        open={open}
        onClose={handleClose}
      ></ModalUnstyled>
    </div>
  );
};

export default LoginButton;
