const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.post('/events', (req, res) => {
    axios.post('http://localhost:4001/events', req.body).catch((err) => {
        console.log(err.message)
    });
    axios.post('http://localhost:4002/events', req.body).catch((err) => {
        console.log(err.message)
    });
    axios.post('http://localhost:4003/events', req.body).catch((err) => {
        console.log(err.message)
    });
    axios.post('http://localhost:4005/events', req.body).catch((err) => {
        console.log(err.message)
    });
    res.send({status: 'OK'})
})


const port = 4004

app.listen(port, () => {
    console.log(`listening port ${port} for event-bus`)
})
