<template>
    <v-app>
        <v-container>
            <v-row class="justify-center align-center">
                <v-col class="col-sm-6 col-lg-5">
                    <v-form class="d-flex flex-column align-stretch justify-stretch">
                        <v-img src="../assets/logo.svg" alt="logo"></v-img>
                        <v-text-field type="email" prepend-icon="mdi-account" label="E-mail" v-model="params.email"></v-text-field>
                        <v-text-field type="password" prepend-icon="mdi-lock" label="Password" v-model="params.password"></v-text-field>
                        <v-btn elevation="5" @click="postUser(params)">Sing in</v-btn>
                        <div class="d-flex justify-space-between"><span>New to Ficus Blog?</span> <span><a href="../create">Create an account</a></span></div>
                    </v-form>
                </v-col>
            </v-row>
        </v-container> 
    </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default ({
    name: 'login',
    data: () => ({
        params: {
            email: 'hui',
            password: 'juiqwe'
        }
    }),
    methods: {
        ...mapActions(['postUser'])
    }
    
})
</script>


<style scoped>

    .v-form {
        background: #fff;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%) !important;
    }

    .v-image {
        width: 50%;
        align-self: center;
        margin-bottom: 20px;
    }

    .v-btn {
        margin: 12px 0;
        background: #39BEA1 !important; 
        color: #f3f3f3 !important;
        border-top-left-radius: 15px;
        border-bottom-right-radius: 15px;
        font-weight: bold;
    }
</style>