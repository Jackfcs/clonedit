import React, { useState } from "react";
import icon from "../icons/icon.svg";
import "../styles/UserDropdown.scss";
import { ChevronDownOutline } from "react-ionicons";

const UserDropdown: React.FC = () => {

  const [isDisplaying, setIsDisplaying] = useState(false);

  const toggleDropdown = () => {
      setIsDisplaying(wasDisplaying => !wasDisplaying)
  }

  return (
    <div  className="dropdown-contents">
      <div onClick={toggleDropdown} className="dropdown-panel">
        <img className="nav-icon" src={icon} alt="Profile icon"></img>
        <p className="nav-username">username</p>
        <ChevronDownOutline
          color={"#000000"}
          height="15px"
          width="15px"
          cssClasses="chevron"
        />
      </div>
      {isDisplaying && (
      
      <div className="dropdown-options">
          <p className="dropdown-item">Log out</p>
          <p className="dropdown-item">Sign up</p>
        </div>
        )}
    </div>
  );
};

export default UserDropdown;
