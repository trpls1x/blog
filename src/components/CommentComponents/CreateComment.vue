<template>
    <v-col id="createComment" class="col-12">
        <v-row class="comment pl-sm-3">
            <v-col class="col-2 col-sm-1 avatar d-none d-sm-block pa-0 pt-3 pr-lg-3"><Picture :image="accountData.avatar" :ratio="1" :type="'avatar'"/></v-col>
            <v-col class="col-12 col-sm-11 pl-lg-0">
                <div class="reply d-flex text--secondary mb-2" v-if="followedComment">
                    <v-icon>mdi-share</v-icon>
                    <span class="font-weight-medium"> {{ followedComment.author }}: </span>
                    <span class="d-block reply-text">{{followedComment.text}}</span>
                    <v-icon @click="clear" class="ml-auto">mdi-close</v-icon>
                </div>
                <v-text-field 
                    class=" d-flex align-center"
                    v-model="text"
                    @blur="$v.text.$touch()"
                    @input="$v.text.$touch()"
                    :error-messages="textErrors"
                    placeholder="Join discussion"
                    hide-details="auto" 
                    solo
                    required
                > 
                    <template v-slot:append-outer>
                        <v-btn class="send" fab small @click="submitComment"><v-icon small>mdi-send</v-icon></v-btn>
                    </template>
                </v-text-field>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
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
        text: { required, minLength: minLength(3), maxLength: maxLength(80) },
    },
    computed: {
        ...mapGetters(['accountData', 'postByID', 'followedComment']),
        textErrors () {
            const errors = [];
            if (!this.$v.text.$dirty) return errors;
            !this.$v.text.required && errors.push('Comment can\'t be empty');
            !this.$v.text.minLength && errors.push('Comment length must be at least 3 characters long');
            !this.$v.text.maxLength && errors.push('Comment length can\'t be more than 80 characters long');
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
                this.$v.$reset()
                await this.getComments(this.postByID._id);
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
    .reply * {
        margin-left: 5px;
    }
    .reply {
        margin: 0 !important;
        padding-right: 50px;
    }
    .reply-text {
        text-overflow: ellipsis;
        overflow: hidden; 
        white-space: nowrap;
    }
    .avatar {
        width: 55px;
    }
    .avatar .v-image {
        border-radius: 50%;
    }
    .send {
        top: -4px
    }
    @media screen and (max-width: 599px) {
        .avatar {
            width: 50px;
        }
    }
</style>