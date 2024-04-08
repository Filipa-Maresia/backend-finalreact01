import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/movies')
      .then(res => {
        setMovies(res.data.movies);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/api/movies/${id}`)
      .then(res => {
        if (res.data.deleted) {
          setMovies(movies.filter(movie => movie._id !== id));
        }
      })
      .catch(err => console.log(err));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movies-page">
      <h2>Movies</h2>
      <div className="movies-list">
        {movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} role="admin" onDelete={handleDelete} />
        ))}
      </div>
      <button onClick={() => navigate('/add-movie')}>Add Movie</button>
    </div>
  );
};

export default MoviesPage;

