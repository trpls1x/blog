<template>
    <div class="post py-3 py-sm-5 px-0 mb-3">
        <v-row class="px-3 px-sm-5 py-0">
            <v-col class="col-12" v-if="full">
                <v-text-field 
                    v-model="title"
                    @blur="$v.title.$touch()"
                    @input="$v.title.$touch()"
                    :error-messages="titleErrors"
                    label="Title" 
                    hide-details="auto" 
                    solo
                ></v-text-field>
                <v-text-field 
                    v-model="description"
                    @blur="$v.description.$touch()"
                    @input="$v.description.$touch()"
                    :error-messages="descriptionErrors"
                    label="Description" 
                    hide-details="auto" 
                    solo
                ></v-text-field>
                <v-textarea 
                    v-model="fullText"
                    @blur="$v.fullText.$touch()"
                    @input="$v.description.$touch()"
                    :error-messages="fullTextErrors"
                    label="Post text" 
                    clear-icon="mdi-close-circle" 
                    hide-details="auto" 
                    solo 
                    counter="400"
                ></v-textarea>
                <v-btn class="mr-3" color="#39BEA1" dark @click="submit">Create post</v-btn>
                <v-btn @click="full = false">Hide</v-btn>

                <v-snackbar
                    v-model="snackbar"
                    top
                    transition="slide-y-transition"
                    elevation="24"
                    color="#b70000"
                    >
                    Post with such title already exists

                    <template v-slot:action="{ attrs }">
                        <v-btn
                        color="#f7f7f7"
                        text
                        v-bind="attrs"
                        @click="snackbar = false"
                        >
                        Close
                        </v-btn>
                    </template>
                </v-snackbar>
            </v-col>
            <v-col class="col-12" v-else>
                <v-btn color="#39BEA1" dark @click="full = true">Create post</v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    props: {
        page: {
            type: Number
        },
        limit: {
            type: Number
        }
    },
    data: () => ({
        title: null,
        description: null,
        fullText: null,
        snackbar: false,
        full: false
    }),
    validations: {
        title: { required, maxLength: maxLength(50), minLength: minLength(5) },
        description: { required, maxLength: maxLength(80) },
        fullText: { required, maxLength: maxLength(400), minLength: minLength(20) }
    },
    computed: {
        titleErrors () {
            const errors = [];
            if (!this.$v.title.$dirty) return errors;
            !this.$v.title.maxLength && errors.push('Title can\'t be longer than 50 characters');
            !this.$v.title.minLength && errors.push('Post text must be at least 5 characters');
            !this.$v.title.required && errors.push('Title is required');
            return errors
        },
        descriptionErrors () {
            const errors = [];
            if (!this.$v.description.$dirty) return errors;
            !this.$v.description.maxLength && errors.push('Description can\'t be longer than 80 characters');
            !this.$v.description.required && errors.push('Description is required');
            return errors;
        },
        fullTextErrors () {
            const errors = [];
            if (!this.$v.fullText.$dirty) return errors;
            !this.$v.fullText.maxLength && errors.push('Post text can\'t be longer than 400 characters');
            !this.$v.fullText.minLength && errors.push('Post text must be at least 20 characters');
            !this.$v.fullText.required && errors.push('Post text is required');
            return errors;
        }
    },
    methods: {
        ...mapActions(['createPost', 'fetchPosts']),
        async submit() {
            this.$v.$touch();
            if(!this.$v.$invalid) {
                try {
                    await this.createPost({
                        title: this.title,
                        description: this.description,
                        fullText: this.fullText
                    });
                    this.title = this.description = this.fullText = '';
                    this.$v.$reset();
                    await this.fetchPosts({
                        skip: (this.page - 1) * this.limit
                    });
                } catch {
                    this.snackbar = true;
                }
            }
        }
    }
}
</script>

<style lang="sass" scoped>
    .post 
        background: $main-white
        transition: .1s ease-in-out
        @extend %card
    
    .v-text-field
        &--enclosed 
            margin-bottom: 5px !important
</style>