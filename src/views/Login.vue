<template>
        <div>
            <v-text-field color="#39BEA1" type="email" prepend-icon="mdi-account" label="E-mail" v-model="params.email"></v-text-field>
            <v-text-field color="#39BEA1" type="password" prepend-icon="mdi-lock" label="Password" v-model="params.password"></v-text-field>
            <v-row>
                <v-col class="col-12 col-md-5"><v-btn elevation="5" @click="postUser(params)">Sing in</v-btn></v-col>
                <v-col class="col-md-7 d-flex justify-md-end align-center"><span class="vertical-center">or <a href="../register">Create an account</a></span></v-col>
            </v-row>
            <div class="d-flex justify-space-between"></div>
        </div>
</template>

<script>
import { mapActions } from 'vuex';

export default ({
    name: "login",
    data: () => ({
        params: {
            email: '',
            password: ''
        }
    }),
    methods: {
        ...mapActions(['postUser'])
    }
})
</script>

<style scoped>
    .v-btn {
        margin: 12px 0;
        width: 100%;
        background: #39BEA1 !important; 
        color: #f7f7f7 !important;
        border-top-left-radius: 15px;
        border-bottom-right-radius: 15px;
        font-weight: bold;
    }
    .v-application a {
        color:#39BEA1
    }
</style>
