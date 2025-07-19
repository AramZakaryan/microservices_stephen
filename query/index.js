const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const {randomBytes} = require("crypto")

app.use(cors())
app.use(bodyParser.json())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})


// app.post('/events', (req, res) => {
//
//     const commentId = randomBytes(4).toString('hex')
//     const {params, body} = req
//     const {postId} = params
//     const {content} = body
//
//
//     const commentsArray = commentsByPostId[postId] || []
//
//     commentsArray.push({id: commentId, content})
//
//     commentsByPostId[postId] = commentsArray
//
//     res.status(201).send(commentsByPostId[postId])
//
// })

app.post('/events', (req, res) => {
        const {body} = req
        const {type, data} = body

        switch (type) {
            case 'post_created': {
                const {id, title} = data
                posts[id] = {
                    id, title, comments: []
                }
                break
            }
            case 'comment_created': {
                const {id, content, status, postId} = data

                const post = posts[postId]
                const comments = post.comments
                comments.push({id, content, status})
                break
            }
            case 'comment_updated': {
                const {id, content, status, postId} = data

                const post = posts[postId]
                const comments = post.comments
                let index = comments.findIndex(comment => comment.id === id)
                comments[index] = {...comments[index], content, status}

                break
            }
            default: {
                console.log(`in switch case default`)
            }
        }

        res.send({status: 'OK'})
    }
)


const port = 4003

app.listen(port, () => {
    console.log(`listening port ${port} for query`)
})
