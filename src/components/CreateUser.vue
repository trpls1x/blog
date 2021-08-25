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