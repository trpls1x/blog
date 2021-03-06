<template>
    <div>
        <h1 class="text-center">Welcome to Ficus.Blog!</h1>
        <p class="text-center">Please fill the blank to proceed</p>
        <v-text-field 
            v-model="email"
            @blur="$v.email.$touch()"
            :error-messages="emailErrors"
            class="mb-3"
            color="#39BEA1" 
            label="E-mail" 
            prepend-inner-icon="mdi-at" 
            hide-details="auto" 
            outlined
            required
        ></v-text-field>
        <v-text-field 
            v-model="password" 
            @blur="$v.password.$touch()"
            @click:append="showPassword = !showPassword"
            :error-messages="passwordErrors"
            class="mb-3"
            :type="showPassword ? 'text' : 'password'"
            hint="At least 6 characters"
            color="#39BEA1" 
            label="Password" 
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            prepend-inner-icon="mdi-lock" 
            hide-details="auto" 
            outlined
            required
        ></v-text-field>
        <v-text-field 
            v-model="name"
            class="mb-3"
            color="#39BEA1" 
            label="Name" 
            prepend-inner-icon="mdi-account-circle" 
            hide-details="auto" 
            outlined
        ></v-text-field>
        <v-text-field 
            v-model="extra_details" 
            class="mb-3"
            color="#39BEA1" 
            label="Extra details" 
            prepend-inner-icon="mdi-account-details" 
            hide-details="auto" 
            outlined
        ></v-text-field>
        <v-text-field 
            v-model="skills" 
            class="mb-3"
            color="#39BEA1" 
            label="Skills" 
            prepend-inner-icon="mdi-book-open-variant" 
            hide-details="auto" 
            outlined
        ></v-text-field>
        <v-text-field 
            v-model="profession" 
            class="mb-3"
            color="#39BEA1" 
            label="Profession" 
            prepend-inner-icon="mdi-briefcase" 
            hide-details="auto" 
            outlined
        ></v-text-field>
        <v-text-field 
            v-model="details" 
            class="mb-3"
            color="#39BEA1" 
            label="Details" 
            prepend-inner-icon="mdi-dots-horizontal" 
            hide-details="auto" 
            outlined
        ></v-text-field>
        <v-row class="d-flex justify-space-between">
            <v-col class="col-12 col-md-8 pb-0"><v-btn class="submit my-1 mx-0" @click="submit">Continue</v-btn></v-col>
            <v-col class="col-12 col-md-3 pb-md-0 pt-0 pt-md-3"><v-btn class="clear my-1 mx-0" @click="clear">Clear</v-btn></v-col>   
        </v-row>
        <v-dialog v-model="dialog" max-width="400"> 
            <v-card class="d-flex flex-column align-stretch">
                <v-toolbar color="#b70000" dark>Error</v-toolbar>
                <v-card-title class="text-h5">
                    <span class="text-center">User with such e-mail already exists</span>
                </v-card-title>
                <v-card-actions class="align-self-end">
                    <v-btn text @click="dialog = false; $router.push('/login')">Sing in</v-btn>
                    <v-btn text @click="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default ({
    mixins: [validationMixin],
    data: () => ({
        email: null,
        password: null,
        name: null,
        extra_details: null,
        skills: null,
        profession: null,
        details: null,
        showPassword: false,
        dialog: false
    }),
    validations: {
        email: { required, email },
        password: { required, minLength: minLength(6) }
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
        ...mapActions(['postUser']),
        async submit() {
            this.$v.$touch();
            if(!this.$v.$invalid) {
                try {
                    await this.postUser({
                        email: this.email,
                        password: this.password,
                        name: this.name,
                        extra_details: this.extra_details,
                        skills: this.skills,
                        profession: this.profession,
                        details: this.details,
                    });
                    this.$router.push({path:'/'});
                } catch {
                    this.dialog = true;
                }
            }
        },
        clear() {
            this.email = this.password = this.name = this.extra_details = this.skills = this.profession = this.details = null;
            this.$v.$reset();
        }
    }
})
</script>

<style lang="sass" scoped>
    .clear, 
    .submit 
        width: 100%
        border-top-left-radius: 15px
        border-bottom-right-radius: 15px
        font-weight: bold
    
    .text-center 
        word-break: normal
    
    .submit 
        background: $main-green !important
        color: $main-white !important
    
    .clear 
        background: $main-white !important
    
    h1 
        @media screen and (max-width: $xs-breakpoint)
            font-size: 1.5rem
</style>