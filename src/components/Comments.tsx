import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { onSnapshot, collection, query, doc} from "firebase/firestore";
import Comment from "./Comment";
import { ImArrowUp } from "react-icons/im";
import InfoPanels from "./InfoPanels";
import "../styles/Comments.scss";

const Comments: React.FC = () => {

  const [comments, setComments] = useState([]);
  const [currentPost, setCurrentPost] = useState<any>();
  const [loading, setLoading] = useState(true)

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
      const data = doc.data()
      if (data) {
        setCurrentPost(data); 
        setLoading(false)
      }
     
    });
    
  }, []);

  console.log(comments)

  // let postContent;
  // if (currentPost.isTextPost) {
  //   postContent = <div className="text-container"><div className="text">{currentPost.postText}</div></div>;
  // } else {
  //   postContent = <img className="image" alt="" src={currentPost.src}></img>;
  // }

  let content

  if (!loading){
    content =  
    <div className="comments-section">
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
      <p className="posted-by">Posted by u/{currentPost.originalPoster} 10 hours ago</p>

      <h3 className="post-title">{currentPost.postTitle}</h3>

      {/* {postContent} */}
      <img className="image" alt="" src={currentPost.src}></img>
      <div className="text-container"><div className="text">{currentPost.postText}</div></div>
    </div>
  </div>
  <div className="comments-link">100 comments</div>
  
    </div>
    <div className="comments-container">
      {comments.map(({ id, comment }, index) => (
        <Comment
          key={index}
          id={id}
          comment={comment.comment}
          originalPoster={comment.originalPoster}
          parent={comment.parent}
          score={comment.score}
          timeStamp={comment.timeStamp}
        />
      ))}
    </div>
    </div>
  } else {
    content = <div>loading</div>
  }
console.log(comments)
  return (
    <div className="comments-bg-padding">
    <div className="comments-page  section-container">
     {content}
     <div className= "comments-info-panels">
     <InfoPanels />
    </div>
    </div>
    </div>

  );
};

export default Comments;
