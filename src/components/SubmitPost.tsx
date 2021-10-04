import React from "react";
import "../styles/SubmitPost.scss";
import InfoPanels from "./InfoPanels";

const SubmitPost: React.FC = () => {
  return (

    <div className="bg-padding">
      <div className="create-post-page">
        <div className="submit-post-section">
          <h3 className="create-post-title">Create a post</h3>
          <div className="post-creation-container">post</div>
        </div>
        <div className="create-post-info-panels">
          <InfoPanels />
        </div>
      </div>
    </div>
   
  );
};

export default SubmitPost;
