import express from 'express'
import CronJob from 'node-cron'
import { checkUpdate } from './src/controllers/covidController.js'

const app = express()
const port = 3000

import('./src/configs/db.js')
import('./src/routes/covidRoutes.js')

CronJob.schedule("*/5 * * * * *", () => {
    checkUpdate()
});

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})