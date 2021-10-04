import React from "react";
import "../styles/CreatePost.scss";
import Input from "./Input";
import { ImageOutline } from "react-ionicons";
import { LinkOutline } from "react-ionicons";
import icon from "../icons/icon.svg";
import { Link } from "react-router-dom"


const CreatePost = () => {
  return (
    <div className="create-post-container section-container">
      <div className="items-container">
        <img className="icon" src={icon} alt="Reddit icon"></img>
        
        <Link style={{width: '100%', textDecoration: "none"}} to="/submit-post">
          

         <Input placeHolder="Create Post" />
        </Link>
        
        <div className="action-container img-button">
          <ImageOutline
            color={"#8f8f8f"}
            height="25px"
            width="25px"
            cssClasses="img-upload-icon"
          />
        </div>
        <div className="action-container">
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
