import Pusher from 'pusher-js';

const pusher = new Pusher(process.env.VUE_APP_APPKEY,{
    appId: process.env.VUE_APP_APPID,
    key: process.env.VUE_APP_APPKEY,
    secret: process.env.VUE_APP_SECRET,
    cluster: process.env.VUE_APP_CLUSTER,
    encrypted: true,
})

const createChannels = (channels, actionPushMessage) => {
    for (let key in channels) {
        //отправляет кучу сообщений, решить...
        pusher.subscribe(channels[key].name).bind('message', function(data) {
            console.log('Message had been sent', data);
            actionPushMessage(data);
        });
    }
}

export {pusher, createChannels};