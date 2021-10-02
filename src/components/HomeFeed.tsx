import React from 'react';
import CreatePost from "./CreatePost";
import InfoPanels from "./InfoPanels";
import PostFilter from "./PostFilter";
import PostFeed from "./PostFeed";


const HomeFeed: React.FC = () => {

 
    return (
        <>
        <div className="feed">
            <CreatePost />
            <PostFilter />
            <PostFeed />
        </div>
        <div className="info-panels">
        <InfoPanels />
      </div>
      </>
    )
}


export default HomeFeed