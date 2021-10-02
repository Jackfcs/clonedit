import React from "react";
import "./App.scss";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomeFeed from "./components/HomeFeed";
import SubmitPost from "./components/SubmitPost";
import Comments from "./components/Comments";

function App() {
  return (
    <Router>
    <AuthProvider>
    <div className="App">
      <Navbar />
      <div className="main-content">
      <Switch>
        <Route exact path="/" component={HomeFeed} />
        <Route exact path="/comments" component={Comments} />
        <Route exact path="/submit-post" component={SubmitPost} />
      </Switch>
      </div>
    </div>
    </AuthProvider>
    </Router>

  );
}

export default App;

