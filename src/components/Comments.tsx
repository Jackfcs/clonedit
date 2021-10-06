import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { onSnapshot, collection, query } from "firebase/firestore";
import Comment from "./Comment";
import Post from "./Post"

interface Props {
  posts: any[]
}

const Comments: React.FC<Props> = ({posts}) => {
  const [comments, setComments] = useState([]);
  const [currentPost, setCurrentPost] = useState({})

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
  }, []);

console.log(comments)
  const postId = useParams();

  return (
    <div>
      {/* <div><Post /></div> */}
      <div>
        {comments.map(({id, comment}) => (
          <Comment id={id} comment={comment.comment} originalPoster={comment.originalPoster} parent={comment.parent} score={comment.score} />
        ))}
        </div>
    </div>
  );
};

export default Comments;
