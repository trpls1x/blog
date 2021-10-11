<template>
    <v-container>
        <v-row>
            <v-col class="col-12 col-sm-6">
                <div class="wrap pa-5">
                    <h2>First list</h2>
                    <draggable 
                    class="list-group pa-4" 
                    :list="list1" 
                    ghost-class="ghost" 
                    group="people" 
                    :animation="200"
                    >
                        <div
                        class="list-group-item d-flex align-center justify-space-between pa-2 mb-1"
                        v-for="(element) in list1"
                        :key="element.name"
                        >
                            <span>{{ element.name }}</span>
                            <span>{{ element.id }}</span>
                        </div>
                    </draggable>
                </div>
            </v-col>
            <v-col class="col-12 col-sm-6">
                <div class="wrap pa-5">
                    <h2>Second list</h2>
                    <draggable 
                    class="list-group pa-4" 
                    :list="list2" 
                    ghost-class="ghost" 
                    group="people"
                    :animation="200"
                    >
                        <div
                        class="list-group-item d-flex align-center justify-space-between pa-2 mb-1"
                        v-for="(element) in list2"
                        :key="element.name"
                        >
                            <span>{{ element.name }}</span>
                            <span>{{ element.id }}</span>
                        </div>
                    </draggable>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    components: {
        draggable,
    },
    data: () => ({
        list1: [
            { name: "John", id: 1 },
            { name: "Joao", id: 2 },
            { name: "Jean", id: 3 },
            { name: "Gerard", id: 4 }
        ],
        list2: [
            { name: "Juan", id: 5 },
            { name: "Edgard", id: 6 },
            { name: "Johnson", id: 7 }
        ]
    }),

}
</script>

<style lang="sass" scoped>
    $light-grey: #E7E7E7

    .wrap 
        background: $main-white
        @extend %card
    
    .list-group 
        border: 1px solid $light-grey
        min-height: 200px
    
    .list-group-item 
        height: 50px
        border-left: 5px solid $light-grey
        border-bottom: 1px solid $light-grey
        
        &:hover 
            cursor: move
    
    .ghost 
        border-left: 5px solid $main-green
        background: $light-grey
        box-shadow: 10px 10px 5px -1px rgba(0, 0, 0, 0.14)
        opacity: 0.5
    
</style>