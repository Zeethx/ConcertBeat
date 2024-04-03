import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/welcome">
                    <img src="/images/2letterlogo.png" alt="Concertbeat" className="nav-logo" />
                </Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/user-top-concerts">Your Artists</Link></li>
                <li><Link to="/user-profile">Profile</Link></li>

            </ul>
        </nav>
    );
};

export default Navbar;
