const express = require('express')
const fetch = require('node-fetch')

const app = express()
const port = 3000

async function get_request(){
    const url = 'https://data.covid19.go.id/public/api/update.json'
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
}

app.get('/', (req,res) => {
    get_request()
})

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})