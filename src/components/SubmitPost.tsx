import React from "react";
import "../styles/SubmitPost.scss";
import InfoPanels from "./InfoPanels";

const SubmitPost: React.FC = () => {
  return (
    <div className="bg-padding">
      <div className="create-post-page">
        <div className="submit-post-section">
          <h3 className="create-post-title">Create a post</h3>
          <div className="post-creation-container">
            <div className="post-types">
              <div className="text-post post-type">Post</div>
              <div className="media-post post-type">Images</div>
              <div className="link-post post-type">Link</div>
            </div>
            <div className="post-content">
              <form className="post-form">
                <input placeholder="Title" className="post-input" type="text"></input>
                <textarea placeholder="Text (optional)" className="post-input"></textarea>
                <input className="submit-post" type="submit" value="POST"></input>
              </form>
            </div>
          </div>
        </div>
        <div className="create-post-info-panels">
          <InfoPanels />
        </div>
      </div>
    </div>
  );
};

export default SubmitPost;
