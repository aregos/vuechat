const Pusher = require('pusher');

const pusher = new Pusher({
    appId: process.env.VUE_APP_APPID,
    key: process.env.VUE_APP_APPKEY,
    secret: process.env.VUE_APP_SECRET,
    cluster: process.env.VUE_APP_CLUSTER,
    encrypted: true,
})

module.exports = pusher;