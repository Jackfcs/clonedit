import React from "react";
import "./App.scss";
import PostFeed from "./components/PostFeed";
import CreatePost from "./components/CreatePost";
import InfoPanels from "./components/InfoPanels";
import PostFilter from "./components/PostFilter";

function App() {
  return (
    <div className="App">
      <div className="feed">
        <CreatePost />
        <PostFilter />
        <PostFeed />
      </div>
      <div className="info-panels">
        <InfoPanels />
      </div>
    </div>
  );
}

export default App;
