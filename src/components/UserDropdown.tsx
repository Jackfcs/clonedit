import React, { useState } from "react";
import icon from "../icons/icon.svg";
import "../styles/UserDropdown.scss";
import { ChevronDownOutline } from "react-ionicons";
import { getAuth, signOut } from "@firebase/auth";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  openLogin?: () => void;
}

const UserDropdown: React.FC<Props> = ({openLogin}) => {
  const [isDisplaying, setIsDisplaying] = useState(false);
  const { currentUser } = useAuth();

  const toggleDropdown = () => {
    setIsDisplaying((wasDisplaying) => !wasDisplaying);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  let dropdownContent;

  if (currentUser) {
    dropdownContent = (
      <div className="dropdown-contents">
        <div onClick={toggleDropdown} className="dropdown-panel">
          <img className="nav-icon" src={icon} alt="Profile icon"></img>
          <p className="nav-username">{currentUser.displayName}</p>
          <ChevronDownOutline
            color={"#000000"}
            height="15px"
            width="15px"
            cssClasses="chevron"
          />
        </div>
        {isDisplaying && (
          <div className="dropdown-options">
            <p onClick={handleLogout} className="dropdown-item">
              Log out
            </p>
          </div>
        )}
      </div>
    );
  } else {
    dropdownContent = (
      <div className="dropdown-contents">
        <div onClick={toggleDropdown} className="dropdown-panel">
          <img className="nav-icon" src={icon} alt="Profile icon"></img>
          <p className="nav-username"></p>
          <ChevronDownOutline
            color={"#000000"}
            height="15px"
            width="15px"
            cssClasses="chevron"
          />
        </div>
        {isDisplaying && (
          <div className="dropdown-options">
            <p onClick={openLogin} className="dropdown-item">
              Log In / Sign Up
            </p>
          </div>
        )}
      </div>
    );
  }

  return <>{dropdownContent}</>;
};

export default UserDropdown;
