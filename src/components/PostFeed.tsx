import React, { useState, useEffect } from "react";
import Post from "./Post";

interface Props {
  posts: any[];
}

const PostFeed: React.FC<Props> = ({posts}) => {



  return (
    <div>
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          id={id}
          postTitle={post.postTitle}
          isTextPost={post.isTextPost}
          originalPoster={post.originalPoster}
          postScore={post.postScore}
          src={post.src}
          postText={post.postText}
          timeStamp={post.timeStamp}
        />
      ))}
     </div>
  );
};

export default PostFeed;
