import React from "react";
import CreatePost from "./CreatePost";
import InfoPanels from "./InfoPanels";
import PostFilter from "./PostFilter";
import PostFeed from "./PostFeed";
import "../styles/HomeFeed.scss";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  posts: any[];
  setPosts: (value: any[] | ((prevVar: any[]) => any[])) => void;
  postsFilter: string;
  setPostsFilter: (value: string | ((prevVar: string) => string)) => void;
  getTimeSincePost: (timeStamp: any) => string;
  getUpArrowClasses: (voteObj: any, user: any) => any;
  getDownArrowClasses: (voteObj: any, user: any) => any;
  handleUpVote: (user: any, voteObj: any, currentPostScore: number, currentPostId: string) => void;
  handleDownVote: (user: any, voteObj: any, currentPostScore: number, currentPostId: string) => void
}

const HomeFeed: React.FC<Props> = ({
  posts,
  getTimeSincePost,
  postsFilter,
  setPostsFilter,
  getUpArrowClasses,
  getDownArrowClasses,
  handleUpVote,
  handleDownVote
}) => {

  const { currentUser } = useAuth();


  return (
    <div className="home-feed-section">
      <div className="feed">
        {currentUser && (
          <CreatePost />
        )}
        <PostFilter postsFilter={postsFilter} setPostsFilter={setPostsFilter} />
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
