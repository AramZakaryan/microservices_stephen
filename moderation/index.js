const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {

        const {body} = req
        const {type, data} = body


        if (type === 'comment_created') {
            const {content} = data

            if (content.toLowerCase().includes("xxx")) {
                await axios.post(`http://localhost:4004/events`, {
                        type: 'comment_moderated',
                        data: {
                            ...data,
                            status: 'rejected'
                        }
                    }
                ).catch(err => {
                    console.log(err)
                })

            } else {
                setTimeout(async ()=>{
                    await axios.post(`http://localhost:4004/events`, {
                            type: 'comment_moderated',
                            data: {
                                ...data,
                                status: 'accepted'
                            }
                        }
                    ).catch(err => {
                        console.log(err)
                    })
                }, 3000)
            }
        }

        res.send({status: 'OK'})

    }
)
;

const port = 4005

app.listen(port, () => {
    console.log(`listening port ${port} for moderation`)
})
