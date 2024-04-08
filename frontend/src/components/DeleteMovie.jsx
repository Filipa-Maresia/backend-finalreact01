import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteMovie = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.delete(`http://localhost:5173/api/movies/${id}`)
      .then(res => {
        if (res.data.deleted) {
          navigate('/movies');
        }
      })
      .catch(err => console.log(err));
  }, [id, navigate]);

  return null; 
};

export default DeleteMovie;
