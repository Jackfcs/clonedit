import React from "react";
import "./App.scss";
import PostFeed from "./components/PostFeed";
import CreatePost from "./components/CreatePost";
import InfoPanels from "./components/InfoPanels";
import PostFilter from "./components/PostFilter";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
      
      <div className="feed">
        <CreatePost />
        <PostFilter />
        <PostFeed />
      </div>
      <div className="info-panels">
        <InfoPanels />
      </div>
      </div>
    </div>
  );
}

export default App;
