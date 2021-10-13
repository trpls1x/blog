<template>
    <v-dialog max-width="600">
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="activator" color="#39BEA1" dark v-bind="attrs" v-on="on" @click="reset()">Edit profile</v-btn>
        </template>
        <template v-slot:default="dialog">
            <v-card>
                <v-toolbar color="#39BEA1" dark>Edit profile</v-toolbar>
                <div class="d-flex justify-center">
                    <table>
                        <tbody>
                            <tr>
                                <td>Name:</td>
                                <td><v-text-field 
                                    :placeholder="user.name" 
                                    hide-details="auto" 
                                    v-model="tempUser.name"
                                ></v-text-field></td>
                            </tr>
                            <tr>
                                <td>Extra details:</td>
                                <td><v-text-field 
                                    :placeholder="user.extra_details || placeholder" 
                                    hide-details="auto" 
                                    v-model="tempUser.extra_details"
                                ></v-text-field></td>
                            </tr>
                            <tr>
                                <td>Skills:</td>
                                <td><v-text-field 
                                    :placeholder="user.skills || placeholder" 
                                    hide-details="auto" 
                                    v-model="tempUser.skills"
                                ></v-text-field></td>
                            </tr>
                            <tr>
                                <td>Profession:</td>
                                <td><v-text-field 
                                    :placeholder="user.profession || placeholder" 
                                    hide-details="auto" 
                                    v-model="tempUser.profession"
                                ></v-text-field></td>
                            </tr>
                            <tr>
                                <td>Details:</td>
                                <td><v-text-field 
                                    :placeholder="user.details || placeholder" 
                                    hide-details="auto" 
                                    v-model="tempUser.details"
                                ></v-text-field></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <v-card-actions class="justify-end">
                    <v-btn color="#39BEA1" text @click="updateUser(); dialog.value = false">Edit</v-btn>
                    <v-btn text @click="dialog.value = false">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    props: {
        user: {
            type: Object
        }
    },
    data: () => ({
        tempUser: {},
        placeholder: 'Not specified'
    }),
    computed: mapGetters(['userByID']),
    methods: {
        ...mapActions(['editUser', 'getUserByID']),
        async updateUser() {
            await this.editUser({
                name: this.tempUser.name,
                extra_details: this.tempUser.extra_details,
                skills: this.tempUser.skills,
                profession: this.tempUser.profession,
                details: this.tempUser.details,
            });
            this.getUserByID(this.user._id);
        },
        reset() {
            this.getUserByID(this.user._id);
            this.tempUser = this.userByID;
        }
    },
}
</script>

<style lang="sass" scoped>
    .activator 
        width: 100%
    
    table 
        border-spacing: 15px
        tr 
            td 
                word-break: break-word
                @media screen and (max-width: $xs-breakpoint)
                    font-size: 0.9rem

                &:first-child 
                    white-space: nowrap
                
                .v-input
                    @media screen and (max-width: $xs-breakpoint)
                        font-size: 0.9rem
    
    .v-input 
        padding: 0
</style>