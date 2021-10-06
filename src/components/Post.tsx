import React from "react";
import "../styles/Post.scss";
import { ImArrowUp } from "react-icons/im";
import {Link} from "react-router-dom"

interface Props {
  postTitle: string;
  src?: string;
  originalPoster: string;
  postScore: number;
  postText?: string;
  isTextPost: boolean;
  id: string;
}

const Post: React.FC<Props> = ({
  postTitle,
  src,
  originalPoster,
  postScore,
  postText,
  isTextPost,
  id
}) => {

  let postContent;
  if (isTextPost) {
    postContent = <div className="text-container"><div className="text">{postText}</div></div>;
  } else {
    postContent = <img className="image" alt="" src={src}></img>;
  }

  return (
    <div className="section-container post-container">
      <div className="post-score-container">
        <div className="voting">
        <ImArrowUp size={20} className="up-arrow arrow" />
        <p className="post-score-number">{postScore}</p>
        <ImArrowUp size={20} className="down-arrow arrow" />
        </div>
      </div>
      <div className="post-info-container">
        <p className="posted-by">Posted by u/{originalPoster} 10 hours ago</p>

        <h3 className="post-title">{postTitle}</h3>

        {postContent}
        <div className="comments-link-container">
          <Link style={{textDecoration: 'none'}}to={`/comments/${id}` }><p className="comments-link">100 comments</p></Link>

        </div>
      </div>
    </div>
  );
};

export default Post;
