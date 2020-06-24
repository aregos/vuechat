const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pusher = require('./pusherServer');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.post('/pusher/message', function(req, res) {
    const {channelKey} = req.body;
    console.log(req.body);
    pusher.trigger(channelKey, 'message', req.body);
    res.send({sended: true});
})

app.post('/pusher/auth', function(req, res) {
    const {socket_id: socketId, channelName: channel} = req.body;
    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);
    }
)

const port = process.env.VUE_APP_SERVER_PORT || 9000;
app.listen(port, () => {
    console.log('Server started');
});