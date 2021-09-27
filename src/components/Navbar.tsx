import React from 'react'
import "../styles/Navbar.scss"
import Input from "./Input"
import UserDropdown from "./UserDropdown"

const Navbar = () => {
    return (
        <div className="navbar-container">
            <div>logo reddit</div>
            <Input placeHolder="Search Reddit" />
            <div>+</div>
            <UserDropdown /> 
        </div>
    )
}

export default Navbar