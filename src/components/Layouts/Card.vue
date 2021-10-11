<template>
    <v-app>
        <v-container>
            <v-row class="justify-center align-center">
                <v-col class="col-12 col-sm-9 col-lg-6">
                    <v-form class="d-flex flex-column align-stretch pt-7 pb-3 px-3 pa-sm-7">
                        <router-link :to="'/'" class="link align-self-center mb-3"><v-img src="@/assets/logo.svg" alt="logo"></v-img></router-link>
                        <router-view/>  
                    </v-form>
                </v-col>
            </v-row>
        </v-container> 
    </v-app>
</template>

<script>
    export default ({
        name: 'card',
    })
</script>


<style lang="sass" scoped>
    .row 
        min-height: 100vh
    
    .link 
        width: 50%
    
    .v-image 
        width: 100%
    
    .v-form 
        background: $main-white
        @extend %card
</style>