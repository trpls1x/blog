<template>
    <v-app>
        <v-container>
            <v-row class="justify-center align-center">
                <v-col class="col-12 col-sm-9 col-lg-6">
                    <v-form class="d-flex flex-column align-stretch">
                        <router-link :to="'/'" class="link align-self-center"><v-img src="@/assets/logo.svg" alt="logo"></v-img></router-link>
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
        min-height: 100vh;
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
        border-radius: 5px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
    }

    @media screen and (max-width: 599px) {
        .v-form {
            padding: 30px 12px 12px;
        }
    }
</style>