<template>
    <v-img :aspect-ratio="aspectRatio" :src="setImage()" alt="avatar" @click="sizeImage()"/>
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
            defult: 1
        },
        type: {
            type: String
        }
    },
    data: () => ({
        aspectRatio: null,
        fullSize: false
    }),
    methods: {
        setImage() {
            return imageSrc(this.image, this.type)
        },
        sizeImage() {
            if(this.type == 'full-post') {
                if(this.fullSize) {
                    this.aspectRatio = 16/9
                } else {
                    this.aspectRatio = 1
                }
                this.fullSize = !this.fullSize
            }
        }
    },
    mounted() {
        this.aspectRatio = this.ratio;
    }
}
</script>