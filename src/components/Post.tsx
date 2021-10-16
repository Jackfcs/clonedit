import React, { useEffect, useState } from "react";
import "../styles/Post.scss";
import { ImArrowUp } from "react-icons/im";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { onSnapshot, collection, query, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  postTitle: string;
  src?: string;
  originalPoster: string;
  postScore: number;
  postText?: string;
  isTextPost: boolean;
  id: string;
  timeStamp: any;
  getTimeSincePost: (timeStamp: any) => string
}


const Post: React.FC<Props> = ({
  postTitle,
  src,
  originalPoster,
  postScore,
  postText,
  isTextPost,
  id,
  timeStamp,
  getTimeSincePost
}) => {

  const [commentNumber, setCommentNumber] = useState(0)
  const { currentUser } = useAuth();


  useEffect(() => {
    const q = query(collection(db, "posts", id, "comments"));
    onSnapshot(q, (snapshot) => {
      setCommentNumber(snapshot.docs.length)
    });
  }, [id]);



  const handleVote = (num: number) => {
    const postRef = doc(db, 'posts', id)
    setDoc(postRef, {postScore: postScore + num}, {merge: true})
  }

  console.log(id)

  let postContent;
  if (isTextPost) {
    postContent = (
      <div className="text-container">
        <div className="text">{postText}</div>
      </div>
    );
  } else {
    postContent = <img className="image" alt="" src={src}></img>;
  }

  return (
    <div className="section-container post-container">
      <div className="post-score-container">
        <div className="voting">
          <ImArrowUp onClick={() => handleVote(1)} size={20} className="up-arrow arrow" />
          <p className="post-score-number">{postScore}</p>
          <ImArrowUp onClick={() => handleVote(-1)} size={20} className="down-arrow arrow" />
        </div>
      </div>
      <div className="post-info-container">
      {timeStamp && (<p className="posted-by">
          Posted by u/{originalPoster} {getTimeSincePost(timeStamp)}
        </p>)}
        

        <h3 className="post-title">{postTitle}12</h3>

        {postContent}
        <div className="comments-link-container">
          <Link style={{ textDecoration: "none" }} to={`/comments/${id}`}>
            <p className="comments-link">{commentNumber} {commentNumber === 1 ? 'comment' : 'comments'}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
