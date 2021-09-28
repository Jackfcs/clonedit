import React from "react";
import "../styles/PostFilter.scss";
import { HiOutlineFire } from "react-icons/hi";
import { BiBarChartAlt2 } from "react-icons/bi";
import { BsGear } from "react-icons/bs";

const PostFilter = () => {
  return (
    <div className="section-container post-filter-container">
      <section className="option">
        <HiOutlineFire size={25} className="filter-icon" />
        <p className="filter-option">Hot</p>
      </section>
      <section className="option">
        <BiBarChartAlt2 size={25} className="filter-icon"/>
        <p className="filter-option">Top</p>
      </section>
      <section className="option">
        <BsGear size={25} className="filter-icon"/>
        <p className="filter-option">New</p>
      </section>
    </div>
  );
};

export default PostFilter;
