import React from "react";

interface Props {
  postTitle: string;
  src?: string;
  originalPoster: string;
  postScore: number;
  postText?: string;
  isTextPost: boolean;
}

const Post: React.FC<Props> = ({ postTitle, src, originalPoster, postScore, postText, isTextPost }) => {

    let postContent
    if (isTextPost){
        postContent = <p>{postText}</p>
    } else {
        postContent = <img alt="" src={src}></img>
    }

  return (
    <div>
      <div className="post-score">
        <p>{postScore}</p>
      </div>
      <div className="post-info">
        <p>Posted by {originalPoster} 10 hours ago</p>

        <h3>{postTitle}</h3>
        
        {postContent}

        <p>100 comments</p>
      </div>
    </div>
  );
};

export default Post;
