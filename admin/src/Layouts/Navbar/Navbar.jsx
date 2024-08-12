import React from 'react'
import profile from '../../assets/adminprofile.jpg'
import './Navbar.css';
import Heading from '../../utils/Heading/Heading';

const Navbar = () => {
  return (
    <nav id = "navbar">
      <div className="navbar-wrapper">
        <div className="nav-logo-box">
            <Heading text="yeasin" level="h3" className="nav-logo"/>
        </div>
        <div className="nav-profile-box">
          <img src={profile} alt="not found" />
        </div>
      </div>
    </nav>
  )
}

export default Navbar