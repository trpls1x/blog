<template>
    <v-container>
        <v-row>
            <v-col class="col-12 col-sm-6">
                <div class="wrap">
                    <h2>First list</h2>
                    <draggable 
                    class="list-group" 
                    :list="list1" 
                    ghost-class="ghost" 
                    group="people" 
                    :animation="200"
                    >
                        <div
                        class="list-group-item d-flex align-center justify-space-between"
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
                <div class="wrap">
                    <h2>Second list</h2>
                    <draggable 
                    class="list-group" 
                    :list="list2" 
                    ghost-class="ghost" 
                    group="people"
                    :animation="200"
                    >
                        <div
                        class="list-group-item d-flex align-center justify-space-between"
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

<style scoped>
    .wrap {
        background: #f7f7f7;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
    }

    .list-group {
        border: 1px solid #E7E7E7;
        padding: 15px;
        min-height: 200px;
    }

    .list-group-item {
        height: 50px;
        border-left: 5px solid #E7E7E7;
        border-bottom: 1px solid #E7E7E7;
        margin-bottom: 4px;
        padding: 10px;
    }
    .list-group-item:hover {
        cursor: move;
    }
    .ghost {
        border-left: 5px solid #39BEA1;
        background: #E7E7E7;
        box-shadow: 10px 10px 5px -1px rgba(0, 0, 0, 0.14);
        opacity: 0.5;
    }
</style>