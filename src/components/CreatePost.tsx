import React from "react";
import "../styles/CreatePost.scss";
import Input from "./Input";
import { ImageOutline } from "react-ionicons";
import { LinkOutline } from "react-ionicons";
import icon from "../icons/icon.svg";

const CreatePost = () => {
  return (
    <div className="create-post-container section-container">
      <div className="items-container">
        <img className="icon" src={icon}></img>
        <Input />
        <div className="img-upload-container">
          <ImageOutline
            color={"#8f8f8f"}
            height="25px"
            width="25px"
            cssClasses="img-upload-icon"
          />
        </div>
        <div className="img-upload-container">
          <LinkOutline
            color={"#8f8f8f"}
            height="25px"
            width="25px"
            cssClasses="link-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
