<template>
    <div class="message-content">
        <div class="top">
            <div class="author">{{message.author.username}}</div>
            <div class="hashName">{{message.author.hashName}}</div>
        </div>
        <div class="middle">{{message.message}}</div>
        <div class="bottom">{{message.date}}</div>
    </div>
</template>

<script>

    export default {
        name: 'Message',
        props: {
            message: Object
        },
    }
</script>

<style scoped>
    .message-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 150px;
        border: 1px solid deepskyblue;
        border-radius: 2px;
    }

    .top {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .middle {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    .bottom {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .author {
        font-weight: bold;
    }
</style>