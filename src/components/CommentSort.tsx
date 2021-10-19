import React, { useState } from "react";
import { ChevronDownOutline } from "react-ionicons";
import "../styles/CommentSort.scss";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

interface Props {
  setComments: (value: any[] | ((prevVar: any[]) => any[])) => void;
  postId: string;
}

const CommentSort: React.FC<Props> = ({ setComments, postId }) => {

  const [isDisplaying, setIsDisplaying] = useState(false);
  const [sortOption, setSortOption] = useState("Top");

  const toggleDropdown = () => {
    setIsDisplaying((wasDisplaying) => !wasDisplaying);
  };

  const selectSortOption = (e: React.MouseEvent) => {
    setSortOption(e.currentTarget.id);
  };

  const orderCommentsByScore = () => {
    const q = query(
      collection(db, "posts", postId, "comments"),
      orderBy("score", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setComments(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          comment: doc.data(),
        }))
      );
    });
    setIsDisplaying(false);
  };

  const orderCommentsByNew = () => {
    const q = query(
      collection(db, "posts", postId, "comments"),
      orderBy("timeStamp", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setComments(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          comment: doc.data(),
        }))
      );
    });
    setIsDisplaying(false);
  };

  const orderCommentsByOld = () => {
    const q = query(
      collection(db, "posts", postId, "comments"),
      orderBy("timeStamp", "asc")
    );

    onSnapshot(q, (snapshot) => {
      setComments(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          comment: doc.data(),
        }))
      );
    });
    setIsDisplaying(false);
  };

  return (
    <>
      <div className="sort-container">
        <p onClick={toggleDropdown} className="sort-text">
          Sort By: {sortOption}{" "}
          <ChevronDownOutline
            color={"#575757"}
            height="15px"
            width="15px"
            cssClasses="sort-chevron"
          />
        </p>
      </div>
      {isDisplaying && (
        <div className="container-border">
          <div className="sort-dropdown-container">
            <p
              id="Top"
              onClick={(e) => {
                orderCommentsByScore();
                selectSortOption(e);
              }}
              className={`sort-option ${
                sortOption === "Top" ? "dropdown-active" : ""
              }`}
            >
              Top
            </p>

           
            <p
              id="New"
              onClick={(e) => {
                orderCommentsByNew();
                selectSortOption(e);
              }}
              className={`sort-option ${
                sortOption === "New" ? "dropdown-active" : ""
              }`}
            >
              New
            </p>
            <p
              id="Old"
              onClick={(e) => {
                orderCommentsByOld();
                selectSortOption(e);
              }}
              className={`sort-option ${
                sortOption === "Old" ? "dropdown-active" : ""
              }`}
            >
              Old
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentSort;
