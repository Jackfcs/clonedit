import React from "react";
import "./App.scss";
import PostFeed from "./components/PostFeed";
import CreatePost from "./components/CreatePost";
import InfoPanels from "./components/InfoPanels";
import PostFilter from "./components/PostFilter";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext"

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
