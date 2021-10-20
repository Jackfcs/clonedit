import React, { useState } from "react";
import "../styles/PostFilter.scss";
import { HiOutlineFire } from "react-icons/hi";
import { BiBarChartAlt2 } from "react-icons/bi";
import { BsGear } from "react-icons/bs";

interface Props {
  setPostsFilter: (value: string | ((prevVar: string) => string)) => void;
}

const PostFilter: React.FC<Props> = ({ setPostsFilter}) => {
  
  const [selected, setSelected] = useState("Hot");

  


  const selectPostType = (e: React.MouseEvent) => {
    setPostsFilter(e.currentTarget.id);
    setSelected(e.currentTarget.id)

    };

  return (
    <div className="section-container post-filter-container">
      <section
        id="Hot"
        className={`option ${selected === "Hot" ? "option-selected" : ""}`}
        onClick={(e) => {
          selectPostType(e);
        }}
      >
        <HiOutlineFire
          size={25}
          className={`filter-icon ${
            selected === "Hot" ? "post-type-highlight" : ""
          }`}
        />
        <p
          className={`filter-option ${
            selected === "Hot" ? "post-type-highlight" : ""
          }`}
        >
          Hot
        </p>
      </section>
      <section
        id="Top"
        className={`option ${selected === "Top" ? "option-selected" : ""}`}
        onClick={(e) => {
          selectPostType(e);
        }}
      >
        <BiBarChartAlt2
          size={25}
          className={`filter-icon ${
            selected === "Top" ? "post-type-highlight" : ""
          }`}
        />
        <p className={`filter-option ${
            selected === "Top" ? "post-type-highlight" : ""
          }`}>Top</p>
      </section>
      <section
        id="New"
        className={`option ${selected === "New" ? "option-selected" : ""}`}
        onClick={(e) => {
          selectPostType(e);
        }}
      >
        <BsGear
          size={25}
          className={`filter-icon ${
            selected === "New" ? "post-type-highlight" : ""
          }`}
        />
        <p className={`filter-option ${
            selected === "New" ? "post-type-highlight" : ""
          }`}>New</p>
      </section>
    </div>
  );
};

export default PostFilter;
