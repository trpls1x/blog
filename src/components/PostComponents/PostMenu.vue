<template>
    <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
                <v-icon large>mdi-dots-horizontal</v-icon>
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
                        <div class="text d-flex justify-center"><span class="text-center">Are you sure want to delete this post?</span></div>
                        <v-card-actions class="justify-end">
                            <v-btn color="#b70000" text @click="deleteClick(); dialog.value = false">Delete</v-btn>
                            <v-btn text @click="dialog.value = false">Cancel</v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </v-list>
    </v-menu>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import EditPost from '@/components/PostComponents/EditPost'

export default {
    components: {
        EditPost
    },
    computed: mapGetters(['postByID']),
    methods: {
        ...mapActions(['deletePost', 'getPostByID', 'editPostImage']),
        triggerFileInput() {
            this.$refs.imageInput.click()
        },
        async uploadPhoto(event) {
            let formData = new FormData()
            formData.append("image", event.target.files[0])
            await this.editPostImage(formData)
            this.getPostByID(this.postByID._id)
        },
        async deleteClick() {
            await this.deletePost(this.postByID._id);
            this.$router.go(-1)
        }
    }
    
}
</script>

<style scoped>
    .text {
        width: 100%;
        padding: 15px;
    }
</style>