<template>
    <v-img :aspect-ratio="1" :src="setAvatar()" alt="avatar"/>
</template>

<script>
import imageExists from '@/services/avatar.service.js'

export default {
    props: {
        avatar: {
            type: String
        }
    },
    methods: {
        setAvatar() {
            if(this.avatar){
                const response = imageExists(this.avatar)
                if(response)
                    return process.env.VUE_APP_API_URL + this.avatar
                return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            }
            return 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
        }
    },
}
</script>