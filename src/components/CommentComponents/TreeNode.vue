<template>
     <div class="wrap" :style = "{ 'padding-left': spacing + 'px' }">
         <div class="comment ma-1 pa-3 d-flex justify-space-between align-center">
            <span>{{ node.text }}</span>
            <v-btn icon x-small v-if="hasChildren" @click="showChildren = !showChildren">
                <v-icon small>{{ showChildren ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
         </div>

         <div v-if="hasChildren" v-show="showChildren">
            <TreeNode 
            v-for="child in node.children" 
            :key="child._id" 
            :node="child"
            :spacing="25"
            />
         </div>
     </div>
</template>

<script>
export default {
    name: 'TreeNode',
    props: {
        node: {
            type: Object
        },
        spacing: {
            type: Number,
            default: 0
        }
    },
    data: () => ({
        showChildren: false
    }),
    computed: {
        hasChildren() {
            const { children } = this.node
            return children && children.length > 0
        }
    }
}
</script>

<style lang="sass" scoped>
    .wrap
        width: 100%

    .comment
        background: $main-green
        color: $main-white
        @extend %card

    .v-btn 
        background: $main-white
        .v-icon
            color: $main-green
</style>