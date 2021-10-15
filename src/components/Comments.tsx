import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { onSnapshot, collection, query, doc } from "firebase/firestore";
import Comment from "./Comment";
import { ImArrowUp } from "react-icons/im";
import InfoPanels from "./InfoPanels";
import "../styles/Comments.scss";
import { ChatbubbleOutline } from "react-ionicons";
import AddComment from "./AddComment";
import { useAuth } from "../contexts/AuthContext";
import LoginButton from "./LoginButton";

interface Props {
  getTimeSincePost: (timeStamp: any) => string;
  openLogin: () => void;
  openSignup: () => void;
  closeLogin: () => void;
  closeSignup: () => void;
  loginOpen: boolean;
  signupOpen: boolean;
}

const Comments: React.FC<Props> = ({
  getTimeSincePost,
  openLogin,
  openSignup,
  closeLogin,
  closeSignup,
  loginOpen,
  signupOpen,
}) => {
  const [comments, setComments] = useState([]);
  const [currentPost, setCurrentPost] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const postId = useParams();

  useEffect(() => {
    const q = query(collection(db, "posts", postId.id, "comments"));
    onSnapshot(q, (snapshot) => {
      setComments(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          comment: doc.data(),
        }))
      );
    });

    onSnapshot(doc(db, "posts", postId.id), (doc) => {
      const data = doc.data();
      if (data) {
        setCurrentPost(data);
        setLoading(false);
      }
    });
  }, [postId.id]);

  // let postContent;
  // if (currentPost.isTextPost) {
  //   postContent = <div className="text-container"><div className="text">{currentPost.postText}</div></div>;
  // } else {
  //   postContent = <img className="image" alt="" src={currentPost.src}></img>;
  // }

  let content;

  if (!loading) {
    content = (
      <div className="comments-section   section-container">
        <div>
          <div className="comments-post-container">
            <div className="comments-post-score-container">
              <div className="voting">
                <ImArrowUp size={20} className="up-arrow arrow" />
                <p className="post-score-number">{currentPost.postScore}</p>
                <ImArrowUp size={20} className="down-arrow arrow" />
              </div>
            </div>
            <div className="post-info-container">
              <p className="posted-by">
                Posted by u/{currentPost.originalPoster}{" "}
                {getTimeSincePost(currentPost.timeStamp)}
              </p>

              <h3 className="post-title">{currentPost.postTitle}</h3>

              {/* {postContent} */}
              <img className="image" alt="" src={currentPost.src}></img>
              <div className="text-container">
                <div className="text">{currentPost.postText}</div>
              </div>
            </div>
          </div>
          <div className="comments-number-container">
            <ChatbubbleOutline
              color={"#878A8C"}
              height="28px"
              width="28px"
              cssClasses="reply-icon"
            />
            <p className="comments-number">100 comments</p>
          </div>
        </div>

        {currentUser && (
          <div className="add-comment-container">
            <p className="comment-as">Comment as {currentUser.displayName}</p>
            <AddComment />
          </div>
        )}

        {!currentUser && (
          <div className="login-signup-container">
            <p className="login-signup-text">
              Log in or sign up to leave a comment
            </p>
            <div className="login-signup-buttons">
              <LoginButton
              width={{ width: "80px" }}
              openLogin={openLogin}
              openSignup={openSignup}
              buttonText="Log in"
              isLogin={true}
            />
            <LoginButton
              width={{ width: "80px" }}
              openLogin={openLogin}
              openSignup={openSignup}
              buttonText="Sign Up"
              isLogin={false}
            />
            </div>
            
          </div>
        )}

        <div className="comments-container">
          {comments.map(({ id, comment }, index) => (
            <Comment
              key={index}
              id={id}
              comment={comment.value}
              originalPoster={comment.originalPoster}
              score={comment.score}
              timeStamp={comment.timeStamp}
            />
          ))}
        </div>
      </div>
    );
  } else {
    content = <div>loading</div>;
  }

  return (
    <div className="comments-bg-padding">
      <div className="comments-page">
        {content}
        <div className="comments-info-panels">
          <InfoPanels />
        </div>
      </div>
    </div>
  );
};

export default Comments;

/* RECURSIVE FUNCTION
{comments.map((comment: any, index: number) => {
  return  <div key={index}><p>{comment.comment.value}</p>
    <Comment key={index} comments={comment.comment.replies} /></div>
})} */
