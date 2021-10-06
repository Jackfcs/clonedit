import React from 'react';
import CreatePost from "./CreatePost";
import InfoPanels from "./InfoPanels";
import PostFilter from "./PostFilter";
import PostFeed from "./PostFeed";
import "../styles/HomeFeed.scss"

interface Props {
    posts: any[];
  }

const HomeFeed: React.FC<Props> = ({posts}) => {

 
    return (
        <div className="home-feed-section">
        <div className="feed">
            <CreatePost />
            <PostFilter />
            <PostFeed posts={posts} />
        </div>
        <div className="info-panels">
        <InfoPanels />
      </div>
      </div>
    )
}


export default HomeFeed