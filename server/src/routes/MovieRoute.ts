import { Router } from "express";
import { check } from 'express-validator';
import MovieController from "../controllers/MovieController";

const router = Router();

// Get all movies
router.get('/movies', MovieController.getAllMovies);

// Get movie by ID
router.get('/movies/:id', MovieController.getMovieById);

// Create a new movie
router.post(
  '/movies',
  [
    check('title').notEmpty().withMessage('Movie title is required'),
    check('releaseDate').notEmpty().withMessage('Release date is required'),
    check('imageUrl').notEmpty().withMessage('Image URL is required'),
  ],
  MovieController.createMovie
);

// Update an existing movie
router.put(
  '/movies/:id',
  [
    check('title').notEmpty().withMessage('Movie title is required'),
    check('releaseDate').notEmpty().withMessage('Release date is required'),
    check('imageUrl').notEmpty().withMessage('Image URL is required'),
  ],
  MovieController.updateMovie
);

// Delete an existing movie
router.delete('/movies/:id', MovieController.deleteMovie);

export default router;
