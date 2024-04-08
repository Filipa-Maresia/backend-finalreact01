import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import '../css/movie.css';

const Movies = ({ role }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5173/api/movies')
      .then(res => {
        setMovies(res.data.movies);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='movie-list'>
      {movies.map(movie => (
        <MovieCard key={movie._id} movie={movie} role={role} />
      ))}
    </div>
  );
};

export default Movies;
