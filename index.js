const express = require('express')
const fetch = require('node-fetch')
const CronJob = require("node-cron");
const mongoose = require("mongoose");

const app = express()
const port = 3000

mongoose.connect("mongodb://wadahsukses:Wadahsukses2021@localhost:27017/?authMechanism=DEFAULT", {
    dbName: 'nax',
});

var schema = mongoose.Schema({
    jumlah_positif: Number,
    jumlah_dirawat: Number,
    jumlah_sembuh: Number,
    jumlah_meninggal: Number,
    created: { type: Date, default: Date.now },
});

var Report = mongoose.model("report", schema, "report");

async function get_request() {
    const url = 'https://data.covid19.go.id/public/api/update.json'
    const res = await fetch(url)
    const data = await res.json()
    return data;
}

async function storeData() {
    let getFromApi = await get_request();

    if (getFromApi.update.penambahan.jumlah_positif > 0 && getFromApi.update.penambahan.jumlah_positif != null) {
        var data = new Report(getFromApi.update.total);

        data.save(function (err, doc) {
            if (err) return console.error(err);
            console.log("Document inserted succussfully!");
        });
    } else {
        console.error('Data tidak berubah');
    }
}

// const scheduledJobFunction = CronJob.schedule("00 59 11 * * *", () => {
const scheduledJobFunction = CronJob.schedule("*/2 * * * * *", () => {
    storeData();
});

scheduledJobFunction.start();

app.get('/', async (req, res) => {
    let data = await get_request()
    let { penambahan, total } = data.update
    res.json({ penambahan: penambahan, total: total });
})


app.get('*', (req, res) => {
    res.json({ 'msg': 'the pages isn`t defined' })
})

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})