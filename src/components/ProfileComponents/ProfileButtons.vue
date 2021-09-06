<template>
    <div class="button-group d-flex flex-column align-end">
        <v-btn 
            class="image-input" 
            elevation="5"
            icon
            @click="triggerFileInput"
        ><v-icon>mdi-camera</v-icon></v-btn>
        <input type="file" accept="image/*" ref="imageInput" @change="uploadPhoto" hidden>
        
        <EditProfile :user="user"/>
        
        <v-dialog max-width="400">
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="activator" color="#b70000" dark v-bind="attrs" v-on="on">Delete profile</v-btn>
            </template>
            <template v-slot:default="dialog">
                <v-card>
                    <v-toolbar color="#b70000" dark>Delete profile</v-toolbar>
                    <div class="text d-flex justify-center"><span class="text-center">Are you sure want to delete your profile?</span></div>
                    <v-card-actions class="justify-end">
                        <v-btn color="#b70000" text @click="deleteProfile(); dialog.value = false">Delete</v-btn>
                        <v-btn text @click="dialog.value = false">Cancel</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import EditProfile from '@/components/ProfileComponents/EditProfile'

export default {
    props: {
        user: {
            type: Object
        }
    },
    components: {
        EditProfile
    },
    methods: {
        ...mapActions(['deleteUser', 'editUserPhoto', 'getUserByID']),
        async deleteProfile() {
            await this.deleteUser();
            this.$router.push({path: '/'})
        },
        triggerFileInput() {
            this.$refs.imageInput.click()
        },
        async uploadPhoto(event) {
            let formData = new FormData()
            formData.append("avatar", event.target.files[0])
            await this.editUserPhoto(formData)
            this.getUserByID(this.user._id)
        }
    }
}
</script>

<style scoped>
    .text {
        width: 100%;
        padding: 15px;
    }
    .button-group, .activator {
        position: relative;
        width: 100%;
        margin-top: 10px;
    }
    .image-input {
        background: #F7F7F7;
        position: absolute;
        top: -55px;
        margin: 5px;
    }
</style>