<template>
    <v-container class="text-center">
        <h1>404 Page Not Found</h1>
        <router-link :to="'/'">Return to main page</router-link>
    </v-container>
</template> 

<style lang="sass" scoped>
    a 
        color: $main-green
        text-decoration: underline
</style>
