// import express from 'express';
// import {checkUpdate, dataCovid, storeData} from '../controllers/covidController.js';

// const router = express.Router();
// router.get('/', checkUpdate());

// router.post('/', storeData());

// export default router;

import express from 'express';
const app = express()

app.get('/', async (req,res) => {
    // const data = await(storeData())
    res.json({
        msg: 'Fetch Data Success!'
    })
})

app.get('*', (req,res) => {
    res.json('Page Not Found')
})
