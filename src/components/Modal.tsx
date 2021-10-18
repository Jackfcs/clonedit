import React, { useRef, useState } from "react";
import { Box } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import LoginImage from "../icons/loginimage.png";
import "../styles/Modal.scss";
import { useAuth } from "../contexts/AuthContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInAnonymously } from "firebase/auth";
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

    if (usernameRef.current.value.length > 20){
      return setError("Username must be fewer than 20 characters")
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
        setError('')
        setLoading(false);
        setTimeout(() => {
          closeModal()
      }, 1000)
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
        setError('')
          setTimeout(() => {
              closeModal()
          }, 1000)
          
      })
      .catch((error) => {
          setError(error.message);
      })
  }

  const handleAnon = (event: React.MouseEvent) => {
    event.preventDefault()
  signInAnonymously(
    auth
    ).then((userCredential) => {
      updateProfile(auth.currentUser, {
        displayName: 'Guest'
    })
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
      setError('')
  }
  

  let modalContent;
  if (isLogin) {
    modalContent = (
        <div className="input-container">
        <div className="modal-header">Login</div>
        {error && <span className="error-message">{error}</span>}
        <form className="form modal-form" onSubmit={handleLogin}>
          <label>
            <input
              placeholder="Email"
              type="email"
              name="email"
              ref={emailRef}
              required
              className="input modal-input"
            ></input>
          </label>
          <label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              ref={passwordRef}
              required
              className="input modal-input"
            ></input>
          </label>          
          <input className="sign-up button" disabled={loading} type="submit" value="Log in"></input>
          <p className="logged-in-message">{currentUser && 'You are now logged in'}</p>
        </form>
        <p className="modal-small">New to Reddit? <span className="modal-switch-link" onClick={changeModal} >Sign Up</span></p>

      </div>
    );
  } else {
    modalContent = (
      <div className="input-container">

        <div className="modal-header">Sign Up</div>
        {error && <span className="error-message">{error}</span>}
        <form className="form modal-form" onSubmit={handleSignup}>
          <label>
            <input
              placeholder="Email"
              type="email"
              name="email"
              ref={emailRef}
              required
              className="input modal-input"
            ></input>
          </label>
          <label>
            <input
              placeholder="Username"
              type="text"
              name="username"
              ref={usernameRef}
              required
              className="input modal-input"
            ></input>
          </label>
          <label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              ref={passwordRef}
              required
              className="input modal-input"
            ></input>
            <input
              placeholder="Confrim Password"
              type="password"
              name="confirmpassword"
              ref={confirmPasswordRef}
              required
              className="input modal-input"
            ></input>
          </label>
          <input className="sign-up button" disabled={loading} type="submit" value="Signup"></input>
          <p className="logged-in-message">{currentUser && 'You are now logged in'}</p>
        </form>
        <p className="modal-small">Have an account? <span onClick={changeModal} className="modal-switch-link" >Log In Here</span></p>
      <button onClick={handleAnon} className="sign-up button" value="">Sign up as guest</button>
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
