import React from 'react';
import CreatePost from "./CreatePost";
import InfoPanels from "./InfoPanels";
import PostFilter from "./PostFilter";
import PostFeed from "./PostFeed";
import "../styles/HomeFeed.scss"


const HomeFeed: React.FC = () => {

 
    return (
        <div className="home-feed-section">
        <div className="feed">
            <CreatePost />
            <PostFilter />
            <PostFeed />
        </div>
        <div className="info-panels">
        <InfoPanels />
      </div>
      </div>
    )
}


export default HomeFeed