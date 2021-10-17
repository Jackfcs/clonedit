import React from "react";
import Post from "./Post";

interface Props {
  posts: any[];
  getTimeSincePost: (timeStamp: any) => string;
  getUpArrowClasses: (voteObj: any, user: any) => any;
  getDownArrowClasses: (voteObj: any, user: any) => any;
  
}

const PostFeed: React.FC<Props> = ({posts, getTimeSincePost, getUpArrowClasses, getDownArrowClasses }) => {



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
          getTimeSincePost={getTimeSincePost}
          currentVotes={post.votes}
          getUpArrowClasses={getUpArrowClasses}
          getDownArrowClasses={getDownArrowClasses}
        />
        
      ))}
     </div>
  );
};

export default PostFeed;
