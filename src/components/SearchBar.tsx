import React, { useState, useEffect } from "react";
import "../styles/SearchBar.scss";
import { SearchOutline } from "react-ionicons";
import {
  onSnapshot,
  collection,
  query,
  where
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      where("postTitle", "in", [searchValue])
    );

    onSnapshot(q, (snapshot) => {
      setSearchResults(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, [searchValue]);



  return (
    <div className="search-bar-container">
      <SearchOutline
        color={"#a0a0a0"}
        title={"search-icon"}
        height="25px"
        width="25px"
        cssClasses="search-icon"
      />

      <input
        onFocus={() => {
          setSearchFocus(true);
        }}
        onBlur={() => {
            setTimeout(() => {
                setSearchFocus(false);
                setSearchValue(" ")
            }, 200)
          
        }}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        className="search-bar"
        placeholder="Search Reddit"
      ></input>
      {searchFocus && searchResults.length === 0 && searchValue !== "" && (
        <div className="search-results">
          <p className="no-results">No results found</p>
        </div>
      )}
      {searchFocus && searchResults.length >= 1 && (
        <div>
          {searchResults.map(({ id, post }) => (
              <Link key={id} to={`/comments/${id}`}>
            <div className="results" >
                <div className="result">
              <div className="post-result">{post.postTitle}</div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
