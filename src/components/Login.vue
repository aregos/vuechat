<template>
    <div>
        <header>Login</header>
        <div class="login">
        <input v-model="username" placeholder="type login"/>
        <input v-model="password" placeholder="type password" type="password"/>
        <button v-on:click="login({username,password})">Login</button>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        ...mapActions({
            login: 'setUserAction'
        }),
    }
}
</script>

<style>
    header {
        text-align: center;
    }

    .login {
        display: flex;
        justify-content: center;
        flex-direction: column;
        max-width: 200px;
    }
</style>