<template>
    <div class="nav d-none d-md-flex flex-column align-stretch text-center">
        <router-link :to="'/posts'">Posts</router-link>
        <router-link :to="'/users'">Users</router-link>
        <router-link :to="'/graphs'">Graphs</router-link>
    </div>
</template>

<style scoped>
    .nav {
        background: #f7f7f7;
        padding: 20px 0;
        border-radius: 5px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        margin-bottom: 10px;
        font-size: 1.2rem;
    }
    .nav a {
        text-decoration: none;
        color: rgba(0, 0, 0, 0.87);
        padding: 10px;
        transition: .1s ease-in-out;
    }
    .nav a:hover {
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        transition: .2s ease-in-out;
    }
</style>