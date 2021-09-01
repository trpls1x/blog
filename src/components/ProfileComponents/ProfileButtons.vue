<template>
    <div class="button-group">
        <UpdateProfile :user="user"/>
        
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
import UpdateProfile from '@/components/ProfileComponents/UpdateProfile'

export default {
    props: {
        user: {
            type: Object
        }
    },
    components: {
        UpdateProfile
    },
    methods: {
        ...mapActions(['deleteUser']),
        async deleteProfile() {
            await this.deleteUser();
            this.$router.push({path: '/'})
        }
    }
}
</script>

<style scoped>
    .text {
        width: 100%;
        padding: 15px;
        font-size: 1.2rem;
    }
    .button-group, .activator {
        width: 100%;
        margin-top: 10px;
    }
</style>