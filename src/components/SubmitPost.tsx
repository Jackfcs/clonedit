import React, { useState } from "react";
import "../styles/SubmitPost.scss";
import InfoPanels from "./InfoPanels";
import { ImageOutline } from "react-ionicons";
import { LinkOutline } from "react-ionicons";
import { NewspaperOutline } from "react-ionicons";
import { db } from "../firebase";
import {
  Timestamp,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const SubmitPost: React.FC = () => {
  const [selected, setSelected] = useState("1");
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const { currentUser } = useAuth();
  const history = useHistory();

  const selectPostType = (e: React.MouseEvent) => {
    setSelected(e.currentTarget.id);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if(selected === '1') {
        addDoc(collection(db, "posts"), {
      isTextPost: true,
      originalPoster: currentUser.displayName,
      commentNo: 0,
      postScore: 1,
      postText: postContent,
      postTitle: postTitle,
      timeStamp: serverTimestamp(),
    }).then(function (docRef) {
      history.push(`/comments/${docRef.id}`);
    });
    } else {
        addDoc(collection(db, "posts"), {
            isTextPost: false,
            originalPoster: currentUser.displayName,
            commentNo: 0,
            postScore: 1,
            src: postContent,
            postTitle: postTitle,
            timeStamp: serverTimestamp(),
          }).then(function (docRef) {
            history.push(`/comments/${docRef.id}`);
    });
}

    setPostTitle("");
    setPostContent("");
  };

  return (
    <div className="bg-padding">
      <div className="create-post-page">
        <div className="submit-post-section">
          <h3 className="create-post-title">Create a post</h3>
          <div className="post-creation-container">
            <div className="post-types">
              <div
                id="1"
                onClick={selectPostType}
                className={`text-post post-type ${
                  selected === "1" ? "highlighted" : ""
                }`}
              >
                <NewspaperOutline
                  color={selected === "1" ? "#0079D3" : "#8f8f8f"}
                  height="25px"
                  width="25px"
                  cssClasses="post-text-icon post-icon"
                />
                <span>Post</span>
              </div>
              <div
                id="2"
                onClick={selectPostType}
                className={`media-post post-type ${
                  selected === "2" ? "highlighted" : ""
                }`}
              >
                <ImageOutline
                  color={selected === "2" ? "#0079D3" : "#8f8f8f"}
                  height="25px"
                  width="25px"
                  cssClasses="post-image-icon post-icon"
                />
                <span>Images</span>
              </div>
              <div
                id="3"
                onClick={selectPostType}
                className={`link-post post-type ${
                  selected === "3" ? "highlighted" : ""
                }`}
              >
                <LinkOutline
                  color={selected === "3" ? "#0079D3" : "#8f8f8f"}
                  height="25px"
                  width="25px"
                  cssClasses="post-link-icon post-icon"
                />
                <span>Link</span>
              </div>
            </div>
            <div className="post-content">
              <form className="post-form">
                <input
                  onChange={(event) => setPostTitle(event.target.value)}
                  placeholder="Title"
                  className="post-input"
                  type="text"
                ></input>
                <textarea
                  onChange={(event) => setPostContent(event.target.value)}
                  placeholder={`${
                    selected === "1" ? "Text (optional)" : "URL"
                  }`}
                  spellCheck="false"
                  className="post-input large-input"
                ></textarea>

                <input
                  onClick={handleSubmit}
                  className="submit-post"
                  type="submit"
                  value="POST"
                ></input>
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
