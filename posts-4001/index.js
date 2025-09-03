// posts-4001/index.js

const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const app = express()
const {randomBytes} = require("crypto")

app.use(cors())
app.use(bodyParser.json())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)

})

app.post('/posts', async (req, res) => {
    const postId = randomBytes(4).toString('hex')
    const {body} = req
    const {title} = body
    posts[postId] = {id: postId, title}
    await axios.post('http://localhost:4004/events', {type: 'post_created', data: posts[postId]}).catch(err => {
        console.log(err)
    })
    res.send(posts[postId])
})

app.post('/events', (req, res) => {
    res.send({status: 'Ok'})
})


const port = 4001

app.listen(port, () => {
    console.log(`this is posts service v.1.0.5`)
    console.log(`listening port ${port} for posts`)
})
