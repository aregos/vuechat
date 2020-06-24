<template>
    <div>
        <header>
            <span>Vue chat</span>
            <div class="right-block-header" v-if="currentUser">
                <p>{{currentUser.username}}</p>
                <hr/>
                <a href="#" v-on:click="logout">logout</a>
            </div>
            <RouterLink v-else to="/login">Login</RouterLink>
        </header>
        <div class="content">
            <div class="channels">
                <h2>Channels</h2>
                <div v-if="!currentUser"></div>
                <ul v-else>
                    <RouterLink
                            v-bind:to="'/' + channel.name.toLowerCase()"
                            v-for="channel in Object.values(channels)"
                            :key="channel.name"
                    >
                        <li
                                v-on:click="setSelectedChannel(channel.name.toLowerCase())"
                                v-bind:class="{active: channel.selected}"
                        >
                            {{channel.name}}
                        </li>
                    </RouterLink>
                </ul>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from "vuex";
    import {createChannels} from "../pusherClient";

    export default {
        name: "Main",
        beforeMount() {
            if (!this.currentUser && localStorage.getItem('user')) {
                const {username, password} = JSON.parse(localStorage.getItem('user'));
                this.setUser({username, password});
            } else if (this.currentUser && !localStorage.getItem('user')) {
                localStorage.setItem('user', JSON.stringify(this.currentUser));
            }
        },
        computed: {
            ...mapState({
                currentUser: state => state.auth.currentUser,
                channels: state => state.channels.channels
            })
        },
        methods: mapActions({
            logout: 'logout',
            setSelectedChannel: 'setSelectedChannelAction',
            setUser: 'setUserAction',
        })
    }

</script>