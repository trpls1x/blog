<template>
    <div class="nav d-none d-md-flex flex-column align-stretch text-center py-5 px-0 mb-3">
        <router-link :to="'/posts'">Posts</router-link>
        <router-link :to="'/users'">Users</router-link>
        <router-link :to="'/graphs'">Graphs</router-link>
        <router-link :to="'/dnd'">Drag and Drop</router-link>
    </div>
</template>

<style lang="sass" scoped>
    .nav 
        background: $main-white
        font-size: 1.2rem
        @extend %card
    
        a 
            text-decoration: none
            color: $font-dark
            padding: 12px
            transition: .1s ease-in-out
    
            &:hover 
                box-shadow: $default-shadow
                transition: .2s ease-in-out
    
</style>