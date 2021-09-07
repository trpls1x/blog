<template>
    <v-dialog max-width="600">
        <template v-slot:activator="{ on, attrs }">
            <v-list-item class="activator" v-bind="attrs" v-on="on"><v-list-item-title>Edit post</v-list-item-title></v-list-item>
        </template>
        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar color="#39BEA1" dark>Edit post</v-toolbar>
                <div class="d-flex justify-center table-wrapper">
                    <table>
                        <tbody>
                            <tr>
                                <td>Title:</td>
                                <td><v-text-field 
                                    v-model="title"
                                    @blur="$v.title.$touch()"
                                    @input="$v.title.$touch()"
                                    :error-messages="titleErrors"
                                    hide-details="auto" 
                                ></v-text-field></td>
                            </tr>
                            <tr>
                                <td>Description:</td>
                                <td><v-text-field 
                                    v-model="description"
                                    @blur="$v.description.$touch()"
                                    @input="$v.description.$touch()"
                                    :error-messages="descriptionErrors"
                                    hide-details="auto"
                                ></v-text-field></td>
                            </tr>
                            <tr>
                                <td>Post text:</td>
                                <td><v-textarea 
                                    v-model="fullText"
                                    @blur="$v.fullText.$touch()"
                                    @input="$v.description.$touch()"
                                    :error-messages="fullTextErrors"
                                    clear-icon="mdi-close-circle" 
                                    hide-details="auto"
                                    counter="400"
                                ></v-textarea></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <v-card-actions class="justify-end">
                    <v-btn color="#39BEA1" text @click="updatePost(); dialog.value = false">Edit</v-btn>
                    <v-btn text @click="dialog.value = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    data: () => ({
        title: '',
        description: '',
        fullText: ''
    }),
    validations: {
        title: { required, maxLength: maxLength(50), minLength: minLength(5) },
        description: { required, maxLength: maxLength(80) },
        fullText: { required, maxLength: maxLength(400), minLength: minLength(20) }
    },
    computed: {
        ...mapGetters(['postByID']),
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
            return errors
        },
        fullTextErrors () {
            const errors = [];
            if (!this.$v.fullText.$dirty) return errors;
            !this.$v.fullText.maxLength && errors.push('Post text can\'t be longer than 400 characters');
            !this.$v.fullText.minLength && errors.push('Post text must be at least 20 characters');
            !this.$v.fullText.required && errors.push('Post text is required');
            return errors
        }
    },
    methods: {
        ...mapActions(['getPostByID', 'editPost']),
        async updatePost() {
            await this.editPost({
                title: this.title,
                description: this.description,
                fullText: this.fullText
            })
        }
    },
    mounted() {
        this.title = this.postByID.title;
        this.description = this.postByID.description;
        this.fullText = this.postByID.fullText;
    }
}
</script>

<style scoped>
    .table-wrapper {
        width: 100%;
    }
    table {
        width: 95%;
        border-spacing: 15px;
    }
    table tr td {
        word-break: break-word;
    }
    .v-input {
        padding: 0;
    }
</style>