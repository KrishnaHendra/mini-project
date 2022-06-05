import express from 'express';
import { checkUpdate, dataCovid, storeData } from '../controllers/covidController.js';

const router = express.Router();

router.get('/', checkUpdate);
router.get('/getdatacovid', dataCovid);
router.post('/', storeData);

export { router };