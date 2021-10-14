import React, { useState } from "react";
import "../styles/AddComment.scss";

const AddComment: React.FC = () => {
  const [commentContent, setCommentContent] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("hi");
  };

  return (
    <div>
      <form className="submit-comment-form">
        <textarea
          onChange={(event) => setCommentContent(event.target.value)}
          placeholder="What are your thoughts?"
          className="reply-input"
        ></textarea>
        <div className="button-container">
          <input
            onClick={handleSubmit}
            className="add-comment-button {} 
            type="submit"
            value="Comment"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
