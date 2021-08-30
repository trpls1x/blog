<template>
    <v-app>
        <v-container>
            <v-row class="justify-center align-center">
                <v-col class="col-sm-7 col-lg-5">
                    <v-form class="d-flex flex-column align-stretch">
                        <router-link :to="'/'" class="link align-self-center"><v-img src="../assets/logo.svg" alt="logo"></v-img></router-link>
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


<style scoped>
    .row {
        height: 100vh;
    }  
    .link {
        width: 50%;
        justify-self: center;
        margin-bottom: 20px;
    }
    .v-image {
        width: 100%;
    }
    .v-form {
        background: #f7f7f7;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
    }
</style>