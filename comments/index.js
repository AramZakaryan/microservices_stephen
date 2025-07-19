const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const app = express()
const {randomBytes} = require("crypto")

app.use(cors())
app.use(bodyParser.json())

const commentsByPostId = {}

app.get('/posts/:postId/comments', (req, res) => {
    const {params} = req
    const {postId} = params
    res.send(commentsByPostId[postId] || [])

})

app.post('/posts/:postId/comments', async (req, res) => {

    const commentId = randomBytes(4).toString('hex')
    const {params, body} = req
    const {postId} = params
    const {content} = body


    const commentsArray = commentsByPostId[postId] || []

    const newComment = {id: commentId, content, status: 'pending'};

    commentsArray.push(newComment)

    commentsByPostId[postId] = commentsArray

    await axios.post('http://localhost:4004/events', {
        type: 'comment_created',
        data: {...newComment, postId},
    }).catch(err => {
        console.log(err)
    })

    res.status(201).send(commentsByPostId[postId])

})

app.post('/events', async (req, res) => {
    const {body} = req
    const {type, data} = body

    if (type === 'comment_moderated') {
        const {id, content, status, postId} = data

        const comments = commentsByPostId[postId]
        let index = comments.findIndex(comment => comment.id === id)
        comments[index] = {...comments[index], content, status}

        await axios.post(`http://localhost:4004/events`, {type: 'comment_updated', data})

    }
    res.send({status: 'Ok'})
})


const port = 4002

app.listen(port, () => {
    console.log(`listening port ${port} for comments`)
})
