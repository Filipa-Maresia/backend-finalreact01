import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, role, onDelete }) => {
  const { title, releaseDate, imageUrl, _id } = movie;

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      onDelete(_id);
    }
  };

  return (
    <div className='movie-card'>
      <img src={imageUrl} alt={title} className='movie-image' />
      <div className="movie-details">
        <h3>{title}</h3>
        <p>{releaseDate}</p>
      </div>
      {role === "admin" &&
        <div className="movie-actions">
          <button><Link to={`/movie/${_id}/edit`} className='btn-link'>edit</Link></button>
          <button onClick={handleDeleteClick}>delete</button>
        </div>}
    </div>
  );
};

export default MovieCard;
