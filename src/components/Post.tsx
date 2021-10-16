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

  const handleDownVote = async () => {
    let userId = currentUser.uid;
    const postRef = doc(db, "posts", id);

    if (currentVotes[`${userId}`] === false) {
      await setDoc(
        postRef,
        {
          postScore: postScore + 1,
          votes: {
            [userId]: null,
          },
        },
        { merge: true }
      );

    } else if (currentVotes[`${userId}`] === true){
      await setDoc(
        postRef,
        {
          postScore: postScore - 2,
          votes: {
            [userId]: false,
          },
        },
        { merge: true }
      );
    } else {
      
      await setDoc(
        postRef,
        {
          postScore: postScore - 1,
          votes: {
            [userId]: false,
          },
        },
        { merge: true }
      );
    }
  };

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

  let upArrowClasses
  if (currentVotes) {
    upArrowClasses = classNames("up-arrow", "arrow", {
      "up-selected": currentVotes[`${currentUser.uid}`],
    });
  } else {
    upArrowClasses = classNames("up-arrow", "arrow")
  }

  let downArrowClasses
  if (currentVotes) {
    downArrowClasses = classNames("down-arrow", "arrow", {
      "down-selected": currentVotes[`${currentUser.uid}`] === false,
    });
  } else {
    downArrowClasses = classNames("down-arrow", "arrow")
  }

  return (
    <div className="section-container post-container">
      <div className="post-score-container">
        <div className="voting">
          <ImArrowUp
            onClick={handleUpVote}
            size={20}
            className={upArrowClasses}
          />
          <p className="post-score-number">{postScore}</p>
          <ImArrowUp
            onClick={handleDownVote}
            size={20}
            className={downArrowClasses}
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
