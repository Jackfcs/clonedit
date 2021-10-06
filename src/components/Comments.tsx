import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { onSnapshot, collection, query, doc} from "firebase/firestore";
import Comment from "./Comment";
import { ImArrowUp } from "react-icons/im";

interface WhenPosted {
  nanoseconds: number;
  seconds: number;
}

interface CurrentPost {
  postTitle: string;
  src?: string;
  originalPoster: string;
  postScore: number;
  postText?: string;
  isTextPost: boolean;
  whenPosted: any;
}

const Comments: React.FC = () => {

  const startingPost = {
    postTitle: '',
    src: '',
    originalPoster: '',
    postScore: 0,
    postText: '',
    isTextPost: false,
    WhenPosted: {
      nanoseconds: 0,
      seconds: 0
    }
  }
  const [comments, setComments] = useState([]);
  const [currentPost, setCurrentPost] = useState<any>();
  const [loading, setLoading] = useState(true)

  const postId = useParams();

  let newObj

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
       
       newObj = Object.create(data)
        setCurrentPost(data); 
        setLoading(false)
      }
     
    });
    
  }, []);
//console.log(currentPost.src)
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
    <div>
    <div>
    <div className="section-container post-container">
    <div className="post-score-container">
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
      <img className="image" alt="" src={currentPost.src}></img>;
    </div>
  </div>
    </div>
    <div>
      {comments.map(({ id, comment }, index) => (
        <Comment
          key={index}
          id={id}
          comment={comment.comment}
          originalPoster={comment.originalPoster}
          parent={comment.parent}
          score={comment.score}
        />
      ))}
    </div>
    </div>
  } else {
    content = <div>loading</div>
  }

  return (
    <div>
     {content}
    </div>
  );
};

export default Comments;
