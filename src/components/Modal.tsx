import React, { useRef, useState } from "react";
import { Box } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import LoginImage from "../icons/loginimage.png";
import "../styles/Modal.scss";
import LoginButton from "./LoginButton";
import { useAuth } from "../contexts/AuthContext";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords must match");
    }

    setError("");
    setLoading(true);
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  

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
        {JSON.stringify(currentUser.email)}

        <div>Sign Up</div>
        {error && <span>{error}</span>}
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
              type="password"
              name="password"
              ref={passwordRef}
              required
            ></input>
            <input
              placeholder="Confrim Password"
              type="password"
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
