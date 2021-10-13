<template>
    <div>
        <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="d-none d-sm-block" icon v-bind="attrs" v-on="on" x-large>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                <v-btn class="d-block d-sm-none mr-2" icon v-bind="attrs" v-on="on" small>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>
            <v-list>
                <EditPost />

                <v-list-item @click="triggerFileInput"><v-list-item-title>Edit image</v-list-item-title></v-list-item>
                <input type="file" accept="image/*" ref="imageInput" @change="uploadPhoto" hidden>
                
                <v-dialog max-width="400">
                    <template v-slot:activator="{ on, attrs }">
                        <v-list-item class="activator" v-bind="attrs" v-on="on"><v-list-item-title>Delete post</v-list-item-title></v-list-item>
                    </template>
                    <template v-slot:default="dialog">
                        <v-card>
                            <v-toolbar color="#b70000" dark>Delete post</v-toolbar>
                            <div class="text d-flex justify-center pa-4"><span class="text-center">Are you sure want to delete this post?</span></div>
                            <v-card-actions class="justify-end">
                                <v-btn color="#b70000" text @click="deleteClick(); dialog.value = false">Delete</v-btn>
                                <v-btn text @click="dialog.value = false">Cancel</v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>
            </v-list>
        </v-menu>

        <v-snackbar
            v-model="snackbar"
            top
            transition="slide-y-transition"
            elevation="24"
            color="#b70000"
            >
            {{ message }}

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
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import EditPost from '@/components/PostComponents/EditPost'

export default {
    components: {
        EditPost
    },
    data: () => ({
        snackbar: false,
        message: null
    }),
    computed: mapGetters(['postByID']),
    methods: {
        ...mapActions(['deletePost', 'getPostByID', 'editPostImage']),
        triggerFileInput() {
            this.$refs.imageInput.click();
        },
        async uploadPhoto(event) {
            let formData = new FormData();
            formData.append("image", event.target.files[0]);
            try {
                await this.editPostImage(formData);
                this.getPostByID(this.postByID._id);
            } catch(e) {
                this.message = e.response.data.error.message;
                this.snackbar = true;   
            }
        },
        async deleteClick() {
            await this.deletePost(this.postByID._id);
            this.$router.go(-1);
        }
    }
}
</script>

<style lang="sass" scoped>
    .text 
        width: 100%
</style>