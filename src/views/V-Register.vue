<template>
    <div>
        <h1 class="text-center">Welcome to Ficus.Blog!</h1>
        <p class="text-center">Please fill the blank to proceed</p>
        <v-text-field color="#39BEA1" label="E-mail" prepend-inner-icon="mdi-at" hide-details="auto" outlined></v-text-field>
        <v-text-field color="#39BEA1" label="Password" prepend-inner-icon="mdi-lock" hide-details="auto" outlined></v-text-field>
        <v-text-field color="#39BEA1" label="Name" prepend-inner-icon="mdi-account-circle" hide-details="auto" outlined></v-text-field>
        <v-text-field color="#39BEA1" label="Extra details" prepend-inner-icon="mdi-account-details" hide-details="auto" outlined></v-text-field>
        <v-text-field color="#39BEA1" label="Skills" prepend-inner-icon="mdi-book-open-variant" hide-details="auto" outlined></v-text-field>
        <v-text-field color="#39BEA1" label="Profession" prepend-inner-icon="mdi-briefcase" hide-details="auto" outlined></v-text-field>
        <v-text-field color="#39BEA1" label="Details" prepend-inner-icon="mdi-dots-horizontal" hide-details="auto" outlined></v-text-field>
        <v-btn>Continue</v-btn>
    </div>
</template>

<script>

export default ({
    name: 'register',
    data: () => ({
        newUser: {
            email: "",
            password: "",
            name: "",
            extra_details: "",
            skills: "",
            profession: "",
            details: ""
        }
    })
})
</script>

<style scoped>
    .v-input {
        margin-bottom: 15px;
    } 
    .v-btn {
        margin: 12px 0;
        width: 100%;
        background: #39BEA1 !important; 
        color: #f3f3f3 !important;
        border-top-left-radius: 15px;
        border-bottom-right-radius: 15px;
        font-weight: bold;
    }
</style>