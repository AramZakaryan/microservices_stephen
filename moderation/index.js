const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {

  const {body} = req
  const {type, data} = body


  // switch (type) {
  //   // case 'post_created': {
  //   //   const {id, title} = data
  //   //   posts[id] = {
  //   //     id, title, comments: []
  //   //   }
  //   //   break
  //   // }
  //   case 'comment_created': {
  //     const {id, content, postId} = data
  //
  //     const post = posts[postId]
  //     const comments = post.comments
  //     comments.push({id, content})
  //     break
  //   }
  //   default: {
  //     console.log(`in switch case default`)
  //   }
  // }

  res.send({status: 'OK'})


});

const port = 4005

app.listen(port, () => {
  console.log(`listening port ${port} for moderation`)
})
