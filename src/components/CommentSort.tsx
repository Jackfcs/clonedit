import React, {useState} from "react";
import { ChevronDownOutline } from "react-ionicons";
import "../styles/CommentSort.scss";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

interface Props {
  setComments: (value: any[] | ((prevVar: any[]) => any[])) => void;
}

const CommentSort: React.FC<Props> = ({ setComments }) => {
    const [isDisplaying, setIsDisplaying] = useState(true);
    const [sortOption, setSortOption] = useState('Top');

    const toggleDropdown = () => {
        setIsDisplaying((wasDisplaying) => !wasDisplaying);
    }

    const selectSortOption = (e: React.MouseEvent) => {
        setSortOption(e.currentTarget.id)
        console.log(sortOption)
    }

    const orderCommentsByTime = () => {
        const q = query(collection(db, "posts"), orderBy("timeStamp", "desc"));
        onSnapshot(q, (snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              post: doc.data(),
            }))
          );
        });
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
       <div className="sort-dropdown-container">
        <p id="Top" onClick={selectSortOption} className="sort-option dropdown-active">Top</p>
        <p id="New" onClick={selectSortOption} className="sort-option">New</p>
        <p id="Old" onClick={selectSortOption} className="sort-option">Old</p>
    </div> 
    )}
    
    </>
  );
};

export default CommentSort;
