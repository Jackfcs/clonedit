import React from 'react';
import './App.scss';
import PostFeed from './components/PostFeed';
import CreatePost from './components/CreatePost'


function App() {

  

  return (
    <div className="App">
      <CreatePost />
      <PostFeed />
      </div>
  );
}

export default App;
