<template>
    <v-img 
        :aspect-ratio="type != 'full-post' ? aspectRatio : ''" 
        :lazy-src="type == 'avatar' ? avatarPlaceholder : postPlaceholder" 
        :src="setImage()" 
        alt="avatar"
    >
        <template v-slot:placeholder>
            <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
            >
            <v-progress-circular
                indeterminate
                color="grey lighten-5"
            ></v-progress-circular>
            </v-row>
        </template>
    </v-img>
</template>

<script>
import imageSrc from '@/services/image.service.js'

export default {
    props: {
        image: {
            type: String
        },
        ratio: {
            type: Number,
        },
        type: {
            type: String
        }
    },
    data: () => ({
        aspectRatio: null,
        avatarPlaceholder: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        postPlaceholder: 'https://nenow.in/wp-content/uploads/2020/04/cat-image-2.jpg'
    }),
    methods: {
        setImage() {
            return imageSrc(this.image, this.type)
        },
    },
    mounted() {
        this.aspectRatio = this.ratio;
    }
}
</script>