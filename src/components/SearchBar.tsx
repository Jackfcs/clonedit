import React, { useState, useEffect } from "react";
import "../styles/SearchBar.scss";
import { SearchOutline } from "react-ionicons";
import {
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

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

  console.log(searchFocus);

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = query(
      collection(db, "posts"),
      where("postTitle", "in", [searchValue])
    );
  };
  console.table(searchResults);

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
          setSearchFocus(false);
        }}
        onChange={(e) => {
          search(e);
          setSearchValue(e.target.value);
        }}
        className="search-bar"
        placeholder="Search Reddit"
      ></input>
      {searchFocus && searchResults.length === 0 && searchValue != "" && (
        <div className="search-container">
          <p>No results found</p>
        </div>
      )}
      {searchFocus && searchResults.length >= 1 && (
        <div>
          {searchResults.map(({ id, post }) => (
            <div className="search-container">
              <div>{id}</div>
              <div>{post.postTitle}</div>
              <p>hello</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
