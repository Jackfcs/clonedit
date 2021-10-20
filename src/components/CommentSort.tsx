import React, { useState } from "react";
import { ChevronDownOutline } from "react-ionicons";
import "../styles/CommentSort.scss";

interface Props {
  setCommentsFilter: (value: string | ((prevVar: string) => string)) => void;
}

const CommentSort: React.FC<Props> = ({ setCommentsFilter }) => {

  const [isDisplaying, setIsDisplaying] = useState(false);
  const [sortOption, setSortOption] = useState("Top");

  const toggleDropdown = () => {
    setIsDisplaying((wasDisplaying) => !wasDisplaying);
  };

  const selectSortOption = (e: React.MouseEvent) => {
    setSortOption(e.currentTarget.id);
    setCommentsFilter(e.currentTarget.id);
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
