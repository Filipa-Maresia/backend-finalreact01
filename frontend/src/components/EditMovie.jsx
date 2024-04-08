import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditMovie = () => {
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5173/api/movies/${id}`)
      .then(res => { 
        setTitle(res.data.title);
        setReleaseDate(res.data.releaseDate);
        setImageUrl(res.data.imageUrl);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/api/movies/${id}`, { title, releaseDate, imageUrl })
      .then(res => { 
        if (res.data.updated) {
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
        <h2>Edit Movie</h2>
        <div className="form-group">
          <label htmlFor="title">Movie Title:</label>
          <input type="text" id="title" name="title" value={title}
            onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="releaseDate">Release Date:</label>
          <input type="text" id="releaseDate" name="releaseDate" value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input type="text" id="imageUrl" name="imageUrl" value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditMovie;
