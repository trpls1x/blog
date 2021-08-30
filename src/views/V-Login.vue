<template>
    <div>
        <v-text-field 
            v-model="email"
            @blur="$v.email.$touch()"
            :error-messages="emailErrors"
            color="#39BEA1" 
            type="email" 
            prepend-icon="mdi-account" 
            label="E-mail" 
            required
        ></v-text-field>
        <v-text-field 
            v-model="password" 
            @blur="$v.password.$touch()"
            @click:append="showPassword = !showPassword"
            :error-messages="passwordErrors"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            color="#39BEA1" 
            prepend-icon="mdi-lock" 
            label="Password" 
            required
        ></v-text-field>
        <v-row>
            <v-col class="col-12 col-md-5"><v-btn elevation="5" @click="submit">Sing in</v-btn></v-col>
            <v-col class="col-md-7 d-flex justify-md-end align-center"><span class="vertical-center">or <a href="../register">Create an account</a></span></v-col>
        </v-row>
        <div class="d-flex justify-space-between"></div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default ({
    mixins: [validationMixin],
    name: "login",
    data: () => ({
        email: '',
        password: '',
        showPassword: false
    }),
    validations: {
        email: { required, email },
        password: { required, minLength: minLength(6) },
    },
    computed: {
        emailErrors () {
            const errors = [];
            if (!this.$v.email.$dirty) return errors;
            !this.$v.email.email && errors.push('Must be valid e-mail');
            !this.$v.email.required && errors.push('E-mail is required');
            return errors
        },
        passwordErrors () {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.minLength && errors.push('Password must be at least 6 characters');
            !this.$v.password.required && errors.push('Password is required');
            return errors
        },
    },
    methods: {
        ...mapActions(['postUser']),
        submit() {
            this.$v.$touch()
            if(this.$v.$invalid) {
                console.log('error')
            } else { 
                this.$router.push({path:'/'})
            }
        }
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
