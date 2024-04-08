import MovieService from '../services/MovieService.ts';
class MovieController {
    getAllMovies(req, res) {
        const movies = MovieService.getAll();
        return res.json(movies);
    }
    getMovieById(req, res) {
        const movieId = parseInt(req.params.id);
        const movie = MovieService.getOne(movieId);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found.' });
        }
        return res.json(movie);
    }
    createMovie(req, res) {
        var _a;
        try {
            const newMovie = MovieService.create(req.body, (_a = req.files) === null || _a === void 0 ? void 0 : _a.image);
            return res.status(201).json(newMovie);
        }
        catch (error) {
            return res.status(500).json({ error: 'Internal server error.' });
        }
    }
    updateMovie(req, res) {
        var _a;
        const movieId = parseInt(req.params.id);
        const updatedMovie = MovieService.update(req.body, movieId, (_a = req.files) === null || _a === void 0 ? void 0 : _a.image);
        if (!updatedMovie) {
            return res.status(404).json({ error: 'Movie not found.' });
        }
        return res.json(updatedMovie);
    }
    deleteMovie(req, res) {
        const movieId = parseInt(req.params.id);
        const deletedMovie = MovieService.delete(movieId);
        if (!deletedMovie) {
            return res.status(404).json({ error: 'Movie not found.' });
        }
        return res.json(deletedMovie);
    }
}
export default new MovieController();
//# sourceMappingURL=MovieController.js.map