import { Router } from "express";
import { check } from 'express-validator';
import MovieController from "../controllers/MovieController";
import { checkRoles } from "../middlewares/AuthMiddleware";

const router = Router();

// Get all movies
router.get('/movies', checkRoles(['admin', 'user']), MovieController.getAllMovies);

// Get movie by ID
router.get('/movies/:id', checkRoles(['admin', 'user']), MovieController.getMovieById);

// Create a new movie
router.post(
  '/movies',
  [
    check('title').notEmpty().withMessage('Movie title is required'),
    check('releaseDate').notEmpty().withMessage('Release date is required'),
    check('imageUrl').notEmpty().withMessage('Image URL is required'),
  ],
  checkRoles(['admin']), // Only admins can create movies
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
  checkRoles(['admin']), // Only admins can update movies
  MovieController.updateMovie
);

// Delete an existing movie
router.delete('/movies/:id', checkRoles(['admin']), MovieController.deleteMovie);

export default router;
