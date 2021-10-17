import React, { useState } from "react";
import "../styles/AddComment.scss";
import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  postId: string
}

const AddComment: React.FC<Props> = ({postId}) => {

  const [commentContent, setCommentContent] = useState("");
  const { currentUser } = useAuth();

  

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if(commentContent === '') {
      return
    }

    await addDoc(collection(db, "posts", postId, "comments"), {
      originalPoster: currentUser.displayName,
      score: 1,
      value: commentContent,
      timeStamp: serverTimestamp(),
      votes: {},
    }).then(function (docRef) {
      setCommentContent('')
    });

  };


  return (
    <div>
      <form className="submit-comment-form">
        <textarea
          onChange={(event) => setCommentContent(event.target.value)}
          placeholder="What are your thoughts?"
          className="reply-input"
          value={commentContent}
        ></textarea>
        <div className="button-container">
          <input
            onClick={handleCommentSubmit}
            className={`add-comment-button ${
                commentContent !== '' ? 'active' : ''
            } `}
            type="submit"
            value="Comment"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
