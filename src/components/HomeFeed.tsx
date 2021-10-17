import React from "react";
import CreatePost from "./CreatePost";
import InfoPanels from "./InfoPanels";
import PostFilter from "./PostFilter";
import PostFeed from "./PostFeed";
import "../styles/HomeFeed.scss";

interface Props {
  posts: any[];
  getTimeSincePost: (timeStamp: any) => string;
  getUpArrowClasses: (voteObj: any, user: any) => any;
  getDownArrowClasses: (voteObj: any, user: any) => any;
  handleUpVote: (user: any, voteObj: any, currentPostScore: number, currentPostId: string) => void;
  handleDownVote: (user: any, voteObj: any, currentPostScore: number, currentPostId: string) => void
}

const HomeFeed: React.FC<Props> = ({
  posts,
  getTimeSincePost,
  getUpArrowClasses,
  getDownArrowClasses,
  handleUpVote,
  handleDownVote
}) => {
  return (
    <div className="home-feed-section">
      <div className="feed">
        <CreatePost />
        <PostFilter />
        <PostFeed
          posts={posts}
          getTimeSincePost={getTimeSincePost}
          getUpArrowClasses={getUpArrowClasses}
          getDownArrowClasses={getDownArrowClasses}
          handleUpVote={handleUpVote}
          handleDownVote={handleDownVote}
        />
      </div>
      <div className="info-panels">
        <InfoPanels />
      </div>
    </div>
  );
};

export default HomeFeed;
