import React, { useRef, useState } from "react";
import { Box } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import LoginImage from "../icons/loginimage.png";
import "../styles/Modal.scss";
import { useAuth } from "../contexts/AuthContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase"

interface Props {
  open: boolean;
  closeModal: () => void;
  openModal: () => void;
  isLogin: boolean;
}

const Modal: React.FC<Props> = ({ open, closeModal, isLogin, openModal }) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //const auth = getAuth();

  const handleSignup = async (event: React.FormEvent) => {
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
        updateProfile(auth.currentUser, {
            displayName: usernameRef.current.value
        })
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  };


  const handleLogin = (event: React.FormEvent) => {
      event.preventDefault()
    signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      ).then((userCredential) => {
          setError(currentUser.email + " signed in")
          setTimeout(() => {
              closeModal()
          }, 1000)
      })
      .catch((error) => {
          setError(error.message);
      })
  }

  const changeModal = () => {
      closeModal()
      openModal()
  }
  

  let modalContent;
  if (isLogin) {
    modalContent = (
        <div className="input-container">
        {currentUser && currentUser.email}

        <div>Log In</div>
        {error && <span>{error}</span>}
        <form className="form" onSubmit={handleLogin}>
          <label>
            <input
              placeholder="Email"
              type="email"
              name="email"
              ref={emailRef}
              required
              className="input"
            ></input>
          </label>
          <label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              ref={passwordRef}
              required
              className="input"
            ></input>
          </label>
          <input className="sign-up button" disabled={loading} type="submit" value="Log in"></input>
        </form>
        <p>Need an account? <span className="modal-switch-link" onClick={changeModal} >Sign Up Here</span></p>

      </div>
    );
  } else {
    modalContent = (
      <div className="input-container">
        {currentUser && currentUser.email}

        <div>Sign Up</div>
        {error && <span>{error}</span>}
        <form onSubmit={handleSignup}>
          <label>
            <input
              placeholder="Email"
              type="email"
              name="email"
              ref={emailRef}
              required
              className="input"
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
              className="input"
            ></input>
            <input
              placeholder="Confrim Password"
              type="password"
              name="confirmpassword"
              ref={confirmPasswordRef}
              required
              className="input"
            ></input>
          </label>
          <input disabled={loading} type="submit" value="Signup"></input>
        </form>
        <p>Have an account? <span onClick={changeModal} className="modal-switch-link" >Log In Here</span></p>
      </div>
    );
  }

  return (
    <div>
      <ModalUnstyled open={open}>
        <Box className="bg">
          <div className="modal">
            <img className="image-dec" src={LoginImage} alt="decorative"></img>
            <button className="close-button" onClick={closeModal}>
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
