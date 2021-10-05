import React, { useState, useEffect } from "react";
import Post from "./Post";
import { db } from "../firebase";
import {
  onSnapshot,
  collection,
  query,
} from "firebase/firestore";

const PostFeed: React.FC = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"))
    onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    });
  }, []);

  return (
    <div>
      {
        posts.map(({id, post}) => (
          <Post key={id} postTitle={post.postTitle} isTextPost={post.isTextPost} originalPoster={post.originalPoster} postScore={post.postScore} src={post.src} postText={post.postText} />
        ))
      }
    </div>
  );
};

export default PostFeed;
