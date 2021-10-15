import React from 'react';
import CreatePost from "./CreatePost";
import InfoPanels from "./InfoPanels";
import PostFilter from "./PostFilter";
import PostFeed from "./PostFeed";
import "../styles/HomeFeed.scss"

interface Props {
    posts: any[];
    getTimeSincePost: (timeStamp: any) => string
  }

const HomeFeed: React.FC<Props> = ({posts, getTimeSincePost}) => {

 
    return (
        <div className="home-feed-section">
        <div className="feed">
            <CreatePost />
            <PostFilter />
            <PostFeed posts={posts} getTimeSincePost={getTimeSincePost} />
        </div>
        <div className="info-panels">
        <InfoPanels />
      </div>
      </div>
    )
}


export default HomeFeed