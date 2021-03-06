import React, { useState, useEffect } from "react";
import "./App.scss";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeFeed from "./components/HomeFeed";
import SubmitPost from "./components/SubmitPost";
import Comments from "./components/Comments";
import { db } from "./firebase";
import {
  onSnapshot,
  collection,
  query,
  doc,
  setDoc,
  orderBy,
} from "firebase/firestore";
import differenceInSeconds from "date-fns/differenceInSeconds";
import daysToWeeks from "date-fns/daysToWeeks";
import classNames from "classnames/bind";

const App: React.FC = () => {
  const [posts, setPosts] = useState([]);

  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [postsFilter, setPostsFilter] = useState("Hot");

  const openLogin = () => {
    setLoginOpen(true);
  };

  const closeLogin = () => {
    setLoginOpen(false);
  };

  const openSignup = () => {
    setSignupOpen(true);
  };

  const closeSignup = () => {
    setSignupOpen(false);
  };

  //Grab posts from db and set posts state
  useEffect(() => {
    let q;
    if (postsFilter === "Top") {
      q = query(collection(db, "posts"), orderBy("postScore", "desc"));
    } else if (postsFilter === "New") {
      q = query(collection(db, "posts"), orderBy("timeStamp", "desc"));
    } else if (postsFilter === "Hot") {
      q = query(collection(db, "posts"), orderBy("postScore", "desc"));
    }

    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });

    return () => {
      unsub();
    };
  }, [postsFilter]);

  const getTimeSincePost = (timeStamp: any) => {
    let inSeconds = differenceInSeconds(new Date(), timeStamp.toDate());

    let inMinutes = Math.round(inSeconds / 60);

    let inHours = Math.round(inMinutes / 60);

    let inDays = Math.round(inHours / 24);

    let inWeeks = daysToWeeks(inDays);

    let inMonths = Math.round(inWeeks / 4);

    let inYears = Math.round(inMonths / 12);

    if (inYears > 0) {
      if (inYears === 1) {
        return inYears.toString() + " year ago";
      } else {
        return inYears.toString() + " years ago";
      }
    } else if (inMonths > 0) {
      if (inMonths === 1) {
        return inMonths.toString() + " month ago";
      } else {
        return inMonths.toString() + " months ago";
      }
    } else if (inWeeks > 0) {
      if (inWeeks === 1) {
        return inWeeks.toString() + " week ago";
      } else {
        return inWeeks.toString() + " weeks ago";
      }
    } else if (inDays > 0) {
      if (inDays === 1) {
        return inDays.toString() + " day ago";
      } else {
        return inDays.toString() + " days ago";
      }
    } else if (inHours > 0) {
      if (inHours === 1) {
        return inHours.toString() + " hour ago";
      } else {
        return inHours.toString() + " hours ago";
      }
    } else if (inMinutes > 0) {
      if (inMinutes === 1) {
        return inMinutes.toString() + " minute ago";
      } else {
        return inMinutes.toString() + " minutes ago";
      }
    } else {
      if (inSeconds === 1) {
        return inSeconds.toString() + " second ago";
      } else {
        return inSeconds.toString() + " seconds ago";
      }
    }
  };

  const getUpArrowClasses = (voteObj: any, user: any) => {
    return classNames("up-arrow", "arrow", {
      "up-selected": user && voteObj[`${user.uid}`],
    });
  };

  const getDownArrowClasses = (voteObj: any, user: any) => {
    return classNames("down-arrow", "arrow", {
      "down-selected": user && voteObj[`${user.uid}`] === false,
    });
  };

  const handleUpVote = async (
    user: any,
    voteObj: any,
    currentPostScore: number,
    currentPostId: string
  ) => {
    if (!user) {
      openSignup();
      return;
    }

    let userId = user.uid;
    const postRef = doc(db, "posts", currentPostId);

    if (voteObj[`${userId}`] === true) {
      await setDoc(
        postRef,
        {
          postScore: currentPostScore - 1,
          votes: {
            [userId]: null,
          },
        },
        { merge: true }
      );
    } else if (voteObj[`${userId}`] === false) {
      await setDoc(
        postRef,
        {
          postScore: currentPostScore + 2,
          votes: {
            [userId]: true,
          },
        },
        { merge: true }
      );
    } else {
      await setDoc(
        postRef,
        {
          postScore: currentPostScore + 1,
          votes: {
            [userId]: true,
          },
        },
        { merge: true }
      );
    }
  };

  const handleDownVote = async (
    user: any,
    voteObj: any,
    currentPostScore: number,
    currentPostId: string
  ) => {
    if (!user) {
      openSignup();
      return;
    }

    let userId = user.uid;
    const postRef = doc(db, "posts", currentPostId);

    if (voteObj[`${userId}`] === false) {
      await setDoc(
        postRef,
        {
          postScore: currentPostScore + 1,
          votes: {
            [userId]: null,
          },
        },
        { merge: true }
      );
    } else if (voteObj[`${userId}`] === true) {
      await setDoc(
        postRef,
        {
          postScore: currentPostScore - 2,
          votes: {
            [userId]: false,
          },
        },
        { merge: true }
      );
    } else {
      await setDoc(
        postRef,
        {
          postScore: currentPostScore - 1,
          votes: {
            [userId]: false,
          },
        },
        { merge: true }
      );
    }
  };

  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar
            openLogin={openLogin}
            closeLogin={closeLogin}
            openSignup={openSignup}
            closeSignup={closeSignup}
            loginOpen={loginOpen}
            signupOpen={signupOpen}
          />
          <div className="main-content">
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <HomeFeed
                    getDownArrowClasses={getDownArrowClasses}
                    getUpArrowClasses={getUpArrowClasses}
                    posts={posts}
                    setPosts={setPosts}
                    getTimeSincePost={getTimeSincePost}
                    handleUpVote={handleUpVote}
                    handleDownVote={handleDownVote}
                    setPostsFilter={setPostsFilter}
                    postsFilter={postsFilter}
                  />
                )}
              />

              <Route
                exact
                path="/comments/:id"
                render={() => (
                  <Comments
                    getTimeSincePost={getTimeSincePost}
                    openLogin={openLogin}
                    openSignup={openSignup}
                    handleUpVote={handleUpVote}
                    handleDownVote={handleDownVote}
                    getDownArrowClasses={getDownArrowClasses}
                    getUpArrowClasses={getUpArrowClasses}
                  />
                )}
              />
              <Route exact path="/submit-post" component={SubmitPost} />
            </Switch>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
