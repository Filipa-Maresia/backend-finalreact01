import FileService from '../utils/FileService';
import jsonFileReader from '../utils/JsonFileReader';
const moviesPath = './src/data/movies.json';
class MovieService {
    getAll() {
        return jsonFileReader.readFileJson(moviesPath);
    }
    getOne(movieId) {
        const movies = jsonFileReader.readFileJson(moviesPath);
        return movies.find(movie => movie.id === movieId);
    }
    create(movieData, imageFile) {
        const { title, price, description, category } = movieData;
        const movies = jsonFileReader.readFileJson(moviesPath);
        const lastId = movies.length > 0 ? movies[movies.length - 1].id : 0;
        let image = 'no-image.jpg';
        const newMovie = {
            id: lastId + 1,
            title,
            price,
            description,
            category,
            image,
        };
        if (imageFile) {
            newMovie.image = FileService.save(imageFile);
        }
        movies.push(newMovie);
        jsonFileReader.writeFileJson(moviesPath, movies);
        return newMovie;
    }
    update(movieData, movieId, movieImage) {
        const { title, price, description, category } = movieData;
        const movies = jsonFileReader.readFileJson(moviesPath);
        const movieIndex = movies.findIndex(movie => movie.id === movieId);
        if (movieIndex === -1)
            return undefined;
        const updatedMovie = {
            id: movieId,
            title,
            price,
            description,
            category,
            image: movies[movieIndex].image,
        };
        if (movieImage) {
            FileService.delete(movies[movieIndex].image);
            updatedMovie.image = FileService.save(movieImage);
        }
        movies[movieIndex] = updatedMovie;
        jsonFileReader.writeFileJson(moviesPath, movies);
        return updatedMovie;
    }
    delete(movieId) {
        const movies = jsonFileReader.readFileJson(moviesPath);
        const movieIndex = movies.findIndex(movie => movie.id === movieId);
        if (movieIndex === -1) {
            return undefined;
        }
        FileService.delete(movies[movieIndex].image);
        const deletedMovie = movies.splice(movieIndex, 1);
        jsonFileReader.writeFileJson(moviesPath, movies);
        return deletedMovie[0];
    }
}
export default new MovieService();
//# sourceMappingURL=MovieService.js.map