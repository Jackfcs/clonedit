import React from "react";
import Post from "./Post";

interface Props {
  posts: any[];
  getTimeSincePost: (timeStamp: any) => string;
  getUpArrowClasses: (voteObj: any, user: any) => any;
  getDownArrowClasses: (voteObj: any, user: any) => any;
  handleUpVote: (
    user: any,
    voteObj: any,
    currentPostScore: number,
    currentPostId: string
  ) => void;
  handleDownVote: (user: any, voteObj: any, currentPostScore: number, currentPostId: string) => void
}

const PostFeed: React.FC<Props> = ({
  posts,
  getTimeSincePost,
  getUpArrowClasses,
  getDownArrowClasses,
  handleUpVote,
  handleDownVote
}) => {
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
          handleUpVote={handleUpVote}
          handleDownVote={handleDownVote}
        />
      ))}
    </div>
  );
};

export default PostFeed;
