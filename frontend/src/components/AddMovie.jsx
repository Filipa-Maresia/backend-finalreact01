import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5173/movie/add', { title, releaseDate, imageUrl })
      .then(res => {
        if (res.data.added) {
          navigate('/movies');
        } else {
          console.log(res);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="movie-form-container">
      <form className="movie-form" onSubmit={handleSubmit}>
        <h2>Add Movie</h2>
        <div className="form-group">
          <label htmlFor="title">Movie Title:</label>
          <input type="text" id="title" name="title"
            onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="releaseDate">Release Date:</label>
          <input type="text" id="releaseDate" name="releaseDate"
            onChange={(e) => setReleaseDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input type="text" id="imageUrl" name="imageUrl"
            onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        <button type="submit">Add </button>
      </form>
    </div>
  );
};

export default AddMovie;
