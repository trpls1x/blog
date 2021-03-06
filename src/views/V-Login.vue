<template>
    <div>
        <span></span>
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
            hide-details="auto"
            required
        ></v-text-field>
        <v-row class="navigation mt-3">
            <v-col class="col-12 col-sm-6 col-md-7">
                <v-btn elevation="5" @click="submit">Sing in</v-btn>
            </v-col>
            <v-col class="col-sm-6 col-md-5 d-flex justify-center justify-sm-end align-center ">
                <span class="vertical-center ">or <a href="../register">Create an account</a></span>
            </v-col>
        </v-row>
        
        <v-dialog v-model="dialog" max-width="400"> 
            <v-card class="d-flex flex-column align-stretch">
                <v-toolbar color="#b70000" dark>Error</v-toolbar>
                <v-card-title class="text-h5 align-self-center">
                    <span class="text-center">Wrong email or password</span>
                </v-card-title>
                <v-card-actions class="align-self-end">
                    <v-btn text @click="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default ({
    mixins: [validationMixin],
    data: () => ({
        email: '',
        password: '',
        showPassword: false,
        dialog: false
    }),
    validations: {
        email: { required, email },
        password: { required, minLength: minLength(6) },
    },
    computed: {
        ...mapGetters(['accountData']),
        emailErrors () {
            const errors = [];
            if (!this.$v.email.$dirty) return errors;
            !this.$v.email.email && errors.push('Must be valid e-mail');
            !this.$v.email.required && errors.push('E-mail is required');
            return errors;
        },
        passwordErrors () {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.minLength && errors.push('Password must be at least 6 characters');
            !this.$v.password.required && errors.push('Password is required');
            return errors;
        }
    },
    created() {
        if(this.accountData)
            this.$router.push({path:'/'});
    },
    methods: {
        ...mapActions(['userAuthorization']),
        async submit() {
            this.$v.$touch();
            if(!this.$v.$invalid) {
                try {
                    await this.userAuthorization({
                        email: this.email,
                        password: this.password
                    });
                    this.$router.go(-1);
                } catch {
                    this.dialog = true;
                    this.email = this.password = '';
                    this.$v.$touch();
                }
            }
        }
    }
})
</script>

<style lang="sass" scoped>
    .v-btn 
        width: 100%
        background: $main-green !important
        color: $main-white !important
        border-top-left-radius: 15px
        border-bottom-right-radius: 15px
        font-weight: bold
    
    .v-application 
        a 
            color: $main-green
</style>
