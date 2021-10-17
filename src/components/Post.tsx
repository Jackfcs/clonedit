import React, { useEffect, useState } from "react";
import "../styles/Post.scss";
import { ImArrowUp } from "react-icons/im";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { onSnapshot, collection, query, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import classNames from "classnames/bind";

interface Props {
  postTitle: string;
  src?: string;
  originalPoster: string;
  postScore: number;
  postText?: string;
  isTextPost: boolean;
  id: string;
  timeStamp: any;
  getTimeSincePost: (timeStamp: any) => string;
  currentVotes?: any;
  getUpArrowClasses: (voteObj: any, user: any) => any;
  getDownArrowClasses: (voteObj: any, user: any) => any;
  handleUpVote: (user: any, voteObj: any, currentPostScore: number, currentPostId: string) => void
  handleDownVote: (user: any, voteObj: any, currentPostScore: number, currentPostId: string) => void
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
  getTimeSincePost,
  currentVotes,
  getUpArrowClasses,
  getDownArrowClasses,
  handleUpVote,
  handleDownVote
}) => {
  const [commentNumber, setCommentNumber] = useState(0);
  const { currentUser } = useAuth();

  useEffect(() => {
    const q = query(collection(db, "posts", id, "comments"));
    onSnapshot(q, (snapshot) => {
      setCommentNumber(snapshot.docs.length);
    });
  }, [id]);

  // const handleUpVote = async () => {

  //   if (!currentUser){
  //     alert("Log in or sign up to vote")
  //     return
  //   }

  //   let userId = currentUser.uid;
  //   const postRef = doc(db, "posts", id);

  //   if (currentVotes[`${userId}`] === true) {
  //     await setDoc(
  //       postRef,
  //       {
  //         postScore: postScore - 1,
  //         votes: {
  //           [userId]: null,
  //         },
  //       },
  //       { merge: true }
  //     );

  //   } else if (currentVotes[`${userId}`] === false){
  //     await setDoc(
  //       postRef,
  //       {
  //         postScore: postScore + 2,
  //         votes: {
  //           [userId]: true,
  //         },
  //       },
  //       { merge: true }
  //     );
  //   } else {
      
  //     await setDoc(
  //       postRef,
  //       {
  //         postScore: postScore + 1,
  //         votes: {
  //           [userId]: true,
  //         },
  //       },
  //       { merge: true }
  //     );
  //   }
  // };

  // const handleDownVote = async () => {

  //   if (!currentUser){
  //     alert("Log in or sign up to vote")
  //     return
  //   }

  //   let userId = currentUser.uid;
  //   const postRef = doc(db, "posts", id);

  //   if (currentVotes[`${userId}`] === false) {
  //     await setDoc(
  //       postRef,
  //       {
  //         postScore: postScore + 1,
  //         votes: {
  //           [userId]: null,
  //         },
  //       },
  //       { merge: true }
  //     );

  //   } else if (currentVotes[`${userId}`] === true){
  //     await setDoc(
  //       postRef,
  //       {
  //         postScore: postScore - 2,
  //         votes: {
  //           [userId]: false,
  //         },
  //       },
  //       { merge: true }
  //     );
  //   } else {
      
  //     await setDoc(
  //       postRef,
  //       {
  //         postScore: postScore - 1,
  //         votes: {
  //           [userId]: false,
  //         },
  //       },
  //       { merge: true }
  //     );
  //   }
  // };

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
          <ImArrowUp
            onClick={() => handleUpVote(currentUser, currentVotes, postScore, id)}
            size={20}
            className={getUpArrowClasses(currentVotes, currentUser)}

          />
          <p className="post-score-number">{postScore}</p>
          <ImArrowUp
            onClick={() => handleDownVote(currentUser, currentVotes, postScore, id)}
            size={20}
            className={getDownArrowClasses(currentVotes, currentUser)}
          />
        </div>
      </div>
      <div className="post-info-container">
        {timeStamp && (
          <p className="posted-by">
            Posted by u/{originalPoster} {getTimeSincePost(timeStamp)}
          </p>
        )}

        <h3 className="post-title">{postTitle}</h3>

        {postContent}
        <div className="comments-link-container">
          <Link style={{ textDecoration: "none" }} to={`/comments/${id}`}>
            <p className="comments-link">
              {commentNumber} {commentNumber === 1 ? "comment" : "comments"}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
