import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as mongoose from 'mongoose';

import router from './routes';
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

app.use(cors({
    origin: "*"
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('build'));

app.use('/', router);

app.get('/*', (req, res) =>{
    res.sendFile('index.html', {root: 'build'})
})


export default app;