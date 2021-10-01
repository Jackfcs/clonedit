import React, { useRef, useState } from "react";
import { Box } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import LoginImage from "../icons/loginimage.png";
import "../styles/Modal.scss";
import LoginButton from "./LoginButton";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  open: boolean;
  close: () => void;
  isLogin: boolean;
}

const Modal: React.FC<Props> = ({ open, close, isLogin }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const { signup } = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  

const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()


    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        return setError("Passwords must match")
    }

    try {
        setError("")
        setLoading(true)
    await signup(emailRef.current.value, usernameRef.current.value, passwordRef.current.value, confirmPasswordRef.current.value)
    } catch {
        setError("Failed to create account")
    }

    
    setLoading(false)

}

// useEffect(() => {
//     emailRef.current!.focus();
//     passwordRef.current!.focus();
// }, [])

  let modalContent;
  if (isLogin) {
    modalContent = (
      <div className="input-container">
        <div>Login</div>
        <p className="smaller-text">
          By continuing, you agree to our User Agreement and Privacy Policy.{" "}
        </p>
        <input></input>
        <input></input>
        <LoginButton width={{ width: "300px" }} buttonText="Login" />
      </div>
    );
  } else {
    modalContent = (
      <div className="input-container">
        <div>Sign Up</div>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              placeholder="Email"
              type="email"
              name="email"
              ref={emailRef}
              required
            ></input>
          </label>
          <label>
            <input
              placeholder="Username"
              type="text"
              name="username"
              ref={usernameRef}
              required
            ></input>
          </label>
          <label>
            <input
              placeholder="Password"
              type="text"
              name="password"
              ref={passwordRef}
              required
            ></input>
            <input
              placeholder="Confrim Password"
              type="text"
              name="confirmpassword"
              ref={confirmPasswordRef}
              required
            ></input>
          </label>
          <input disabled={loading} type="submit" value="Signup"></input>
        </form>
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
            <div>{modalContent}</div>
          </div>
        </Box>
      </ModalUnstyled>
    </div>
  );
};

export default Modal;
