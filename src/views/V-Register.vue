<template>
    <div>
        <h1 class="text-center">Welcome to Ficus.Blog!</h1>
        <p class="text-center">Please fill the blank to proceed</p>
        <v-text-field 
            v-model="email"
            @blur="$v.email.$touch()"
            :error-messages="emailErrors"
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
            @blur="$v.name.$touch()" 
            :error-messages="nameErrors"
            color="#39BEA1" 
            label="Name" 
            prepend-inner-icon="mdi-account-circle" 
            hide-details="auto" 
            outlined
            required
        ></v-text-field>
        <v-text-field 
            v-model="extra_details" 
            color="#39BEA1" 
            label="Extra details" 
            prepend-inner-icon="mdi-account-details" 
            hide-details="auto" 
            outlined
        ></v-text-field>
        <v-text-field 
            v-model="skills" 
            color="#39BEA1" 
            label="Skills" 
            prepend-inner-icon="mdi-book-open-variant" 
            hide-details="auto" 
            outlined
        ></v-text-field>
        <v-text-field 
            v-model="profession" 
            color="#39BEA1" 
            label="Profession" 
            prepend-inner-icon="mdi-briefcase" 
            hide-details="auto" 
            outlined
        ></v-text-field>
        <v-text-field 
            v-model="details" 
            color="#39BEA1" 
            label="Details" 
            prepend-inner-icon="mdi-dots-horizontal" 
            hide-details="auto" 
            outlined
        ></v-text-field>
        <div class="d-flex justify-space-between">
            <v-btn class="submit col-md-8" @click="submit">Continue</v-btn>
            <v-btn class="clear col-md-3" @click="clear">Clear</v-btn>
        </div>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength, alpha } from 'vuelidate/lib/validators'

export default ({
    mixins: [validationMixin],
    name: 'register',
    data: () => ({
        email: null,
        password: null,
        name: null,
        extra_details: null,
        skills: null,
        profession: null,
        details: null,
        showPassword: false
    }),
    validations: {
        email: { required, email },
        password: { required, minLength: minLength(6) },
        name: { required, alpha }
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
        nameErrors () {
            const errors = [];
            if (!this.$v.name.$dirty) return errors;
            !this.$v.name.required && errors.push('Name is required');
            !this.$v.name.alpha && errors.push('Name can\'t contain numbers');
            return errors
        }
    },
    methods: {
        submit() {
            this.$v.$touch()
            if(this.$v.$invalid) {
                console.log('error')
            } else { 
                this.$router.push({path:'/'})
            }
        },
        clear() {
            this.$v.$reset();
            this.email = null;
            this.password = null;
            this.name = null;
            this.extra_details = null;
            this.skills = null;
            this.profession = null;
            this.details = null;
        }
    }
})
</script>

<style scoped>
    .v-input {
        margin-bottom: 15px;
    } 
    .v-btn {
        margin: 6px 0;
        border-top-left-radius: 15px;
        border-bottom-right-radius: 15px;
        font-weight: bold;
    }
    .submit {
        background: #39BEA1 !important; 
        color: #f3f3f3 !important;
    }
    .clear {
        background: #F7F7F7 !important; 
    }
</style>