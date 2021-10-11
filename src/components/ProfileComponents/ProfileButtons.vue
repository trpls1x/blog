<template>
    <div class="button-group d-flex flex-column align-end mt-2">
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
                <v-btn class="activator mt-2" color="#b70000" dark v-bind="attrs" v-on="on">Delete profile</v-btn>
            </template>
            <template v-slot:default="dialog">
                <v-card>
                    <v-toolbar color="#b70000" dark>Delete profile</v-toolbar>
                    <div class="text d-flex justify-center pa-4"><span class="text-center">Are you sure want to delete your profile?</span></div>
                    <v-card-actions class="justify-end">
                        <v-btn color="#b70000" text @click="deleteProfile(); dialog.value = false">Delete</v-btn>
                        <v-btn text @click="dialog.value = false">Cancel</v-btn>
                    </v-card-actions>
                </v-card>
            </template>
        </v-dialog>

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
    data: () => ({ 
        snackbar: false,
        message: ''
    }),
    methods: {
        ...mapActions(['deleteUser', 'editUserPhoto']),
        async deleteProfile() {
            await this.deleteUser();
            this.$router.push({path: '/'});
        },
        triggerFileInput() {
            this.$refs.imageInput.click();
        },
        async uploadPhoto(event) {
            let formData = new FormData();
            formData.append("avatar", event.target.files[0]);
            try {
                await this.editUserPhoto(formData);
                this.$router.go();
            } catch(e) {
                this.message = e.response.data.error.message;
                this.snackbar = true;
            }
        }
    }
}
</script>

<style lang="sass" scoped>
    .text 
        width: 100%
    
    .button-group, 
    .activator 
        position: relative
        width: 100%
    
    .image-input 
        background: $main-white
        position: absolute
        top: -55px
        margin: 6px 5px
</style>