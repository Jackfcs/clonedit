import React, { useState } from "react";
import "../styles/Post.scss"

interface Props {
  postTitle: string;
  src?: string;
  originalPoster: string;
  postScore: number;
  postText?: string;
  isTextPost: boolean;
}

const Post: React.FC<Props> = ({
  postTitle,
  src,
  originalPoster,
  postScore,
  postText,
  isTextPost,
}) => {

  let postContent;
  if (isTextPost) {
    postContent = <p className="text">{postText}</p>;
  } else {
    postContent = <img className="image" alt="" src={src}></img>;
  }

  return (
    <div className="section-container post-container">
      <div className="post-score-container">
        <p className="post-score-number">{postScore}</p>
      </div>
      <div className="post-info-container">
        <p className="posted-by">Posted by {originalPoster} 10 hours ago</p>

        <h3 className="post-title">{postTitle}</h3>

        {postContent}
        <div className="comments-link-container">
        <p className="comments-link">100 comments</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
