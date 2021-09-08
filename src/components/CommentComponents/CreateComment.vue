<template>
    <v-col class="col-12">
        <v-row>
            <v-col class="col-1 avatar"><Picture :image="accountData.avatar" :ratio="1" :type="'avatar'"/></v-col>
            
            <v-col class="col-10">
                <div class="reply d-flex text--secondary mb-2" v-if="followedComment">
                    <v-icon>mdi-share</v-icon>
                    <span class="font-weight-medium"> {{ followedComment.author }}: </span>
                    <span>{{followedComment.text}}</span>
                    <v-icon @click="clear" class="ml-auto">mdi-close</v-icon>
                </div>
                <v-text-field 
                    v-model="text"
                    @blur="$v.text.$touch()"
                    :error-messages="textErrors"
                    placeholder="Join discussion"
                    hide-details="auto" 
                    solo
                    required
                ></v-text-field>
            </v-col>
            <v-col class="col-1 d-flex justify-center align-end">
                <v-btn fab small @click="submitComment"><v-icon small>mdi-send</v-icon></v-btn>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import Picture from '@/components/Picture'

export default {
    mixins: [validationMixin],
    components: {
        Picture
    },
    data: () => ({
        text: null,
    }),
    validations: {
        text: { required, minLength: minLength(3) },
    },
    computed: {
        ...mapGetters(['accountData', 'postByID', 'followedComment']),
        textErrors () {
            const errors = [];
            if (!this.$v.text.$dirty) return errors;
            !this.$v.text.required && errors.push('Comment can\'t be empty');
            !this.$v.text.minLength && errors.push('Comment length must be at least 3 characters long');
            return errors
        },
    },
    methods: {
        ...mapActions(['postComment', 'getComments']),
        ...mapMutations(['updateFollowedComment']),
        async submitComment() {
            this.$v.$touch()
            if(!this.$v.$invalid) {
                await this.postComment({
                    text: this.text,
                    followedCommentID: this.followedComment ? this.followedComment._id : null
                });
                this.text = this.followedCommentID = null;
                this.clear();
                await this.getComments(this.postByID._id);
                this.$v.$reset()
            }
        },
        clear() {
            this.updateFollowedComment({
                comment: null
            })
        }
    }
}
</script>

<style scoped>
    .v-btn {
        margin-bottom: 4px;
    }
    .reply * {
        margin-left: 5px;
    }
    .avatar .v-image {
        border-radius: 50%;
    }
</style>