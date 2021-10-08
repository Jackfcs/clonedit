import React from "react";
import "../styles/Comment.scss";
import { ImArrowUp } from "react-icons/im";
import ProfileImage from "../icons/profileimage.png";

interface Props {
  comment: string;
  originalPoster: string;
  parent?: string;
  score: number;
  id: string;
  timeStamp: any;
}

const Comment: React.FC<Props> = ({
  id,
  comment,
  originalPoster,
  parent,
  score,
  timeStamp
}) => {

    console.log(timeStamp)
  return (
    <div className="comment-container">
        <div className="icon-name-timestamp">
      <img className="comment-image" src={ProfileImage}></img>
      <div>{originalPoster}</div>
      <div></div>
      </div>

      <div>Comment: {comment}</div>
      
      <div>Parent: {parent}</div>
      <div>Post Score: {score}</div>
      <div>ID is {id}</div>
      <div className="comment-score-container">
        <div className="voting">
          <ImArrowUp size={20} className="up-arrow arrow" />
          <p className="post-score-number">20</p>
          <ImArrowUp size={20} className="down-arrow arrow" />
        </div>
      </div>
    </div>
  );
};

export default Comment;
