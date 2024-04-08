import React from 'react';
import '../css/Home.css';

const Home = () => {
  return (
    <div className='home'>
      <div className="home-content">
        <h1 className='home-text'>Movie Center</h1>
        <p className='home-description'>
          Welcome to the Movie Center!
        </p>
      </div>
      <div className="home-image"></div>
    </div>
  );
}

export default Home;
