
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import MovieRoute from '../src/routes/MovieRoute';
import UserRoute from '../src/routes/UserRoute';
import { Movie } from '../src/models/MovieModel'; 
import { User } from '../src/models/UserModel'; 
import { Admin } from '../src/models/AdminModel'; 
import setupSwagger from '../src/docs/swagger';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.get('/dashboard', async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const adminCount = await Admin.countDocuments();
        const movieCount = await Movie.countDocuments();

        return res.json({ ok: true, user: userCount, book: movieCount, admin: adminCount });
    } catch (err: any) {
        return res.status(500).json({ error: (err as Error).message });
    }
});

app.use('/api', MovieRoute);
app.use('/auth', UserRoute); 

const startApp = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error('MONGO_URI is not defined in the .env file');
        }

        mongoose.set("strictQuery", true);
        await mongoose.connect(MONGO_URI);
        console.log("Successfully connected to db");

        app.listen(PORT, () => {
            console.log(`Server is running on PORT ${PORT}`);
        });

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
}

setupSwagger(app);

startApp();
