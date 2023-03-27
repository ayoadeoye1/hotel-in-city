import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as mongoose from 'mongoose';

import { Main, Add } from './controllers/main'

dotenv.config();

const app = express();

const MONGO_URL = process.env.MONGO_URL;

const dbConnect = async() =>{
    try {
        await mongoose.connect(MONGO_URL);
        console.log('DB connected')
    } catch (error) {
        console.log(error.message);
    }
}

dbConnect();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors());

app.get('/hotel/:city', Main);
app.post('/hotel', Add);

export default app;