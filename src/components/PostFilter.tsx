import React, { useState } from "react";
import "../styles/PostFilter.scss";
import { HiOutlineFire } from "react-icons/hi";
import { BiBarChartAlt2 } from "react-icons/bi";
import { BsGear } from "react-icons/bs";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

interface Props {
  posts: any[];
  setPosts: (value: any[] | ((prevVar: any[]) => any[])) => void;
}

const PostFilter: React.FC<Props> = ({ posts, setPosts }) => {
  const [selected, setSelected] = useState("1");

  const orderPostsByTime = () => {
    const q = query(collection(db, "posts"), orderBy("timeStamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  };

  const selectPostType = (e: React.MouseEvent) => {
    setSelected(e.currentTarget.id);
    console.log(selected);
  };

  const orderPostsByScore = () => {
    const q = query(collection(db, "posts"), orderBy("postScore", "desc"));
    onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  };

  // const orderPostsByComments = () => {
  //   const q = query(collection(db, "posts"), where("comments", "!=", []));
  //   onSnapshot(q, (snapshot) => {
  //     setPosts(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         post: doc.data(),
  //       }))
  //     );
  //   });
  // }

  return (
    <div className="section-container post-filter-container">
      <section
        id="1"
        className={`option ${selected === "1" ? "option-selected" : ""}`}
        onClick={(e) => {
          orderPostsByScore();
          selectPostType(e);
        }}
      >
        <HiOutlineFire
          size={25}
          className={`filter-icon ${
            selected === "1" ? "post-type-highlight" : ""
          }`}
        />
        <p
          className={`filter-option ${
            selected === "1" ? "post-type-highlight" : ""
          }`}
        >
          Hot
        </p>
      </section>
      <section
        id="2"
        className={`option ${selected === "2" ? "option-selected" : ""}`}
        onClick={(e) => {
          orderPostsByScore();
          selectPostType(e);
        }}
      >
        <BiBarChartAlt2
          size={25}
          className={`filter-icon ${
            selected === "2" ? "post-type-highlight" : ""
          }`}
        />
        <p className={`filter-option ${
            selected === "2" ? "post-type-highlight" : ""
          }`}>Top</p>
      </section>
      <section
        id="3"
        className={`option ${selected === "3" ? "option-selected" : ""}`}
        onClick={(e) => {
          orderPostsByTime();
          selectPostType(e);
        }}
      >
        <BsGear
          size={25}
          className={`filter-icon ${
            selected === "3" ? "post-type-highlight" : ""
          }`}
        />
        <p className={`filter-option ${
            selected === "3" ? "post-type-highlight" : ""
          }`}>New</p>
      </section>
    </div>
  );
};

export default PostFilter;
