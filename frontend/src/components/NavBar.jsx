import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = ({ role }) => {
  return (
    <nav className='navbar'>
      <div className='navbar-left'>
        <Link to="/" className='navbar-brand'>Movie Center</Link>
      </div>
      <div className='navbar-right'>
        <Link to="/movies" className='navbar-link'>Movies</Link> 
        {role === "admin" && (
          <>
            <Link to="/addmovie" className="navbar-link">Add Movie</Link>
            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          </>
        )}
        {role === "" ?
          <Link to="/login" className='navbar-link'>Login</Link>
          : <Link to="/logout" className='navbar-link'>Logout</Link>
        }
      </div>
    </nav>
  );
};

export default Navbar;
