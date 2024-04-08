import { Router } from "express";
import { check } from 'express-validator';
import MovieController from "../controllers/MovieController.ts";
const router = Router();
router.get('/movies', MovieController.getAllMovies);
router.get('/movies/:id', MovieController.getMovieById);
router.post('/movies', [
    check('title').notEmpty().withMessage('Movie title is required'),
    check('description').notEmpty().withMessage('Movie description is required'),
    check('price').isNumeric().withMessage('Price must be a number'),
], MovieController.createMovie);
router.put('/movies/:id', [
    check('title').notEmpty().withMessage('Movie title is required'),
    check('description').notEmpty().withMessage('Movie description is required'),
    check('price').isNumeric().withMessage('Price must be a number'),
], MovieController.updateMovie);
router.delete('/movies/:id', MovieController.deleteMovie);
export default router;
//# sourceMappingURL=MovieRoute.js.map