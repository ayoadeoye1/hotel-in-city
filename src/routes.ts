import * as express from 'express';

import { Main, Add } from './controllers/main'
import upload from './utils/multer';


const router = express.Router();

router.get('/hotel/:city', Main);
router.post('/hotel', upload.single('image'), Add);


export default router