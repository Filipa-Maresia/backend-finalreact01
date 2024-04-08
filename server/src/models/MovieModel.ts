import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: { type: String },
    releaseDate: { type: Date, default: new Date}, 
    imageUrl: { type: String, required: true }
});

const movieModel = mongoose.model('Movie', movieSchema);

export { movieModel as Movie };
