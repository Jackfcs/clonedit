import React, {useState, useEffect} from 'react';
import "../styles/SearchBar.scss";
import { SearchOutline } from 'react-ionicons';
import {
    onSnapshot,
    collection,
    query,
    doc,
    setDoc,
    orderBy,
  } from "firebase/firestore";
  import { db } from "../firebase";

const SearchBar: React.FC = () => {

    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState<any>();
    const [searchFocus, setSearchFocus] = useState(false)

    console.log(searchFocus)

    useEffect(() => {
        
       
       
        const q = query(collection(db, "posts"), orderBy("postScore", "desc"));
       
    
        const unsub = onSnapshot(q, (snapshot) => {
          setSearchResults(
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

    return (
        <div className="search-bar-container">
            <SearchOutline
                color={'#a0a0a0'} 
                title={'search-icon'}
                height="25px"
                width="25px"
                cssClasses="search-icon"
            />

            <input onFocus={ () => {setSearchFocus(true)} } onBlur={ () => {setSearchFocus(false)} } onChange={(e) => {setSearchValue(e.target.value)}} className="search-bar" placeholder="Search Reddit"></input>

        </div>
    )
}

export default SearchBar
