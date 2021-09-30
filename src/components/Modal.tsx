import React from "react";
import { Box } from "@mui/system";
import ModalUnstyled from "@mui/core/ModalUnstyled";
import LoginImage from "../icons/loginimage.png";
import "../styles/Modal.scss";

interface Props {
  open: boolean;
  close: () => void;
  header: string;
  isLogin: boolean;
}

const Modal: React.FC<Props> = ({ open, close, header, isLogin }) => {
  let modalContent;

  if (isLogin) {
    modalContent = (
      <div>
        <input></input>
        <input></input>
        <div>log me in</div>
      </div>
    );
  } else {
    modalContent = (
      <div>
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
            <div className="">
              <h2>{header}</h2>
              {modalContent}
            </div>
          </div>
        </Box>
      </ModalUnstyled>
    </div>
  );
};

export default Modal;
