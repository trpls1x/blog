<template>
    <v-container class="text-center">
        <h1>404 Page Not Found</h1>
        <a @click="$router.go(-1)">Go back </a> <span>or</span> <br>
        <router-link :to="'/'">Return to main page</router-link>
    </v-container>
</template> 

<style scoped>
    a{
        color: #39BEA1;
        text-decoration: underline;
    }
</style>
