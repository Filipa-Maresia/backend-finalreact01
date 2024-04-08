import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import MovieRoute from '../src/routes/MovieRoute.ts';
import UserRoute from '../src/routes/UserRoute.ts';
import setupSwagger from '../src/docs/swagger.ts';
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
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
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }
};
setupSwagger(app);
startApp();
//# sourceMappingURL=index.js.map