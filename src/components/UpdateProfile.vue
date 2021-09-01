<template>
    <v-dialog max-width="600">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="#39BEA1" dark v-bind="attrs" v-on="on">Edit profile</v-btn>
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
                                    v-model="name"
                                ></v-text-field></td>
                            </tr>
                            <tr>
                                <td>Extra details:</td>
                                <td><v-text-field 
                                    :placeholder="user.extra_details || placeholder" 
                                    hide-details="auto" 
                                    v-model="extra_details"
                                ></v-text-field></td>
                            </tr>
                            <tr>
                                <td>Skills:</td>
                                <td><v-text-field 
                                    :placeholder="user.skills || placeholder" 
                                    hide-details="auto" 
                                    v-model="skills"
                                ></v-text-field></td>
                            </tr>
                            <tr>
                                <td>Profession:</td>
                                <td><v-text-field 
                                    :placeholder="user.profession || placeholder" 
                                    hide-details="auto" 
                                    v-model="profession"
                                ></v-text-field></td>
                            </tr>
                            <tr>
                                <td>Details:</td>
                                <td><v-text-field 
                                    :placeholder="user.details || placeholder" 
                                    hide-details="auto" 
                                    v-model="details"
                                ></v-text-field></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <v-card-actions class="justify-end">
                    <v-btn color="#39BEA1" text @click="updateUser(); dialog.value = false">Edit</v-btn>
                    <v-btn text @click="dialog.value = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: {
        user: {
            type: Object
        }
    },
    data: () => ({
        name: null,
        extra_details: null,
        skills: null,
        profession: null,
        details: null,
        placeholder: 'Not specified'
    }),
    methods: {
        ...mapActions(['editUser']),
        updateUser() {
            this.editUser({
                name: this.name,
                extra_details: this.extra_details,
                skills: this.skills,
                profession: this.profession,
                details: this.details,
            })
        }
    },
    mounted() {
        this.name = this.user.name;
        this.email = this.user.email;
        this.extra_details = this.user.extra_details;
        this.skills = this.user.skills;
        this.profession = this.user.profession;
        this.details = this.user.details;
    }
}
</script>

<style scoped>
    .modal {
        width: 100%;
    }
    table {
        border-spacing: 15px;
    }    
    table tr td:first-child {
        white-space: nowrap;
    }
    table tr td {
        word-break: break-word;
    }
    .user-posts .col-12 {
        padding: 0;
    }
    .v-input {
        padding: 0;
    }
</style>