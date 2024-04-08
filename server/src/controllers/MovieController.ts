import { Request, Response } from 'express';
import MovieService from '../services/MovieService';
import { IMovie } from '../interfaces/Interfaces';

class MovieController {
  getAllMovies(req: Request, res: Response) {
    const movies = MovieService.getAll();
    return res.json(movies);
  }

  getMovieById(req: Request, res: Response) {
    const movieId = parseInt(req.params.id);
    const movie = MovieService.getOne(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found.' });
    }
    return res.json(movie);
  }

  createMovie(req: Request, res: Response) {
    try {
      const newMovie: IMovie = MovieService.create(req.body, req.files?.image);
      return res.status(201).json(newMovie);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  updateMovie(req: Request, res: Response) {
    const movieId = parseInt(req.params.id);
    const updatedMovie = MovieService.update(req.body, movieId, req.files?.image);

    if (!updatedMovie) {
      return res.status(404).json({ error: 'Movie not found.' });
    }

    return res.json(updatedMovie);
  }

  deleteMovie(req: Request, res: Response) {
    const movieId = parseInt(req.params.id);
    const deletedMovie = MovieService.delete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ error: 'Movie not found.' });
    }

    return res.json(deletedMovie);
  }
}

export default new MovieController();
