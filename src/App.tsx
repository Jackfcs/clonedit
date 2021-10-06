import React, {useState, useEffect} from "react";
import "./App.scss";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomeFeed from "./components/HomeFeed";
import SubmitPost from "./components/SubmitPost";
import Comments from "./components/Comments";
import { db } from "./firebase";
import { onSnapshot, collection, query } from "firebase/firestore";
import { isTemplateExpression } from "typescript";

const App:React.FC = () => {


  const [posts, setPosts] = useState([]);

  //Grab posts from db and set posts state
  useEffect(() => {
    const q = query(collection(db, "posts"));
    onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <Router>
    <AuthProvider>
    <div className="App">
      <Navbar />
      <div className="main-content">
      <Switch>

        <Route exact path="/" render={() => (<HomeFeed posts={posts} />)} />

        <Route exact path="/comments/:id" component={Comments}/>
        <Route exact path="/submit-post" component={SubmitPost} />
      </Switch>
      </div>
    </div>
    </AuthProvider>
    </Router>

  );
}

export default App;

