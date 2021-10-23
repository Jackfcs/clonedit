import React, { useState } from "react";
import "../styles/PostFilter.scss";
import { HiOutlineFire } from "react-icons/hi";
import { BiBarChartAlt2 } from "react-icons/bi";
import { BsGear } from "react-icons/bs";

interface Props {
  postsFilter: string;
  setPostsFilter: (value: string | ((prevVar: string) => string)) => void;
}

const PostFilter: React.FC<Props> = ({ postsFilter, setPostsFilter }) => {
  

  const selectPostType = (e: React.MouseEvent) => {
    setPostsFilter(e.currentTarget.id);

    };

  return (
    <div className="section-container post-filter-container">
      <section
        id="Hot"
        className={`option ${postsFilter === "Hot" ? "option-selected" : ""}`}
        onClick={(e) => {
          selectPostType(e);
        }}
      >
        <HiOutlineFire
          size={25}
          className={`filter-icon ${
            postsFilter === "Hot" ? "post-type-highlight" : ""
          }`}
        />
        <p
          className={`filter-option ${
            postsFilter === "Hot" ? "post-type-highlight" : ""
          }`}
        >
          Hot
        </p>
      </section>
      <section
        id="Top"
        className={`option ${postsFilter === "Top" ? "option-selected" : ""}`}
        onClick={(e) => {
          selectPostType(e);
        }}
      >
        <BiBarChartAlt2
          size={25}
          className={`filter-icon ${
            postsFilter === "Top" ? "post-type-highlight" : ""
          }`}
        />
        <p className={`filter-option ${
            postsFilter === "Top" ? "post-type-highlight" : ""
          }`}>Top</p>
      </section>
      <section
        id="New"
        className={`option ${postsFilter === "New" ? "option-selected" : ""}`}
        onClick={(e) => {
          selectPostType(e);
        }}
      >
        <BsGear
          size={25}
          className={`filter-icon ${
            postsFilter === "New" ? "post-type-highlight" : ""
          }`}
        />
        <p className={`filter-option ${
            postsFilter === "New" ? "post-type-highlight" : ""
          }`}>New</p>
      </section>
    </div>
  );
};

export default PostFilter;
