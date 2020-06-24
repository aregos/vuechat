<template>
    <div class="right-content">
        <div class="messages">
            <h2>Messages</h2>
            <div class="messages-content">
                <div class="chat">
                    <Message
                            v-bind:message="message"
                            v-for="message in getChannelMessagesByCurrentRoute(this.$route.path.slice(1))"
                            :key="message.content"
                    />
                </div>
                <input v-model="text" placeholder="Enter message"/>
                <button v-on:click="addMessage(messageObject)">Send</button>
            </div>
        </div>
        <div class="members">
            <h2>Members</h2>
            <div class="members-list">
                <ul>
                    <li
                            v-for="member in getChannelMembersByCurrentRoute(this.$route.path.slice(1))"
                            :key="member.username"
                            class="member"
                    >
                        {{member.username}}
                        <span class="presence" v-bind:class="{online: member.presence === 'online'}">{{member.presence}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Message from './Message';
import {mapActions, mapGetters, mapState} from "vuex";
import {createChannels} from "../pusherClient";

export default {
    name: 'Chat',
    beforeMount() {
        createChannels(this.channels, this.pushMessage);
    },
    mounted() {
        if (this.currentUser) {
            this.addMemberToAllChannels(this.currentUser)
        }
    },
    data() {
        return {
            text: ''
        }
    },
    components: {
        Message
    },
    computed: {
        ...mapState({
            channels: state => state.channels.channels,
            currentUser: state => state.auth.currentUser,
        }),
        ...mapGetters([
            'getChannelByCurrentRoute',
            'getChannelMessagesByCurrentRoute',
            'getChannelMembersByCurrentRoute'
        ]),
        messageObject() {
            const now = new Date();
            const date = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getDate()}.${now.getMonth()}.${now.getFullYear()}`
            return {
                channelKey: this.$route.path.slice(1),
                content: this.text,
                author: this.currentUser,
                date
            }
        }
    },
    methods: {
        ...mapActions({
            pushMessage: 'pushMessageAction',
            addMemberToChannel: 'addMemberToChannelAction',
            addMemberToAllChannels: 'addMemberToAllChannelsAction'
        }),
        addMessage: function(data) {
            // TODO некрасиво тут это делать, вынести куда-нибудь
            fetch(`http://${process.env.VUE_APP_SERVER_HOST}:${process.env.VUE_APP_SERVER_PORT}/pusher/message`, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'accept': 'application/json'
                },
                mode: 'cors', // no-cors, *cors, same-origin
                method: 'POST',
                body: JSON.stringify({
                    channelKey: data.channelKey,
                    message: {
                        author: data.author,
                        content: data.content,
                        date: data.date
                    }
                })
            })
        }
    }
    }
</script>

<style>
    .presence {
        border: 1px solid;
        border-radius: 30px;
        background-color: yellow;
        color: black;
        padding: 2px;
    }

    .member {
        border: 1px solid grey;
        border-radius: 5px;
        width: 100%;
        padding: 10px;
        list-style: none;
    }

    .online {
        background-color: limegreen;
        color: white;
    }
</style>