<template>
    <v-container>
        <div class="graph">
            <v-row>
                <v-col class="col-9 col-lg-5">
                    <v-select
                        v-model="chartValue"
                        :items="['Posts', 'Users']"
                        :menu-props="{offsetY: true }"
                        label="Select"
                        color="#39BEA1"
                        hide-details="auto"
                        outlined
                        single-line
                    ></v-select>
                </v-col>	

                <v-col class="col-12 col-sm-6 col-lg-3">
                    <v-menu
                        v-model="menuFrom"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateFrom"
                                label="Filter from..."
                                color="#39BEA1"
                                prepend-inner-icon="mdi-calendar"
                                hide-details="auto"
                                readonly
                                outlined
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="dateFrom"
                            color="#39BEA1"
                            elevation="2"
                            @input="menuFrom = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col class="col-12 col-sm-6 col-lg-3">
                    <v-menu
                        v-model="menuTo"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="dateTo"
                                label="Filter to..."
                                color="#39BEA1"
                                prepend-inner-icon="mdi-calendar"
                                hide-details="auto"
                                outlined
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="dateTo"
                            color="#39BEA1"
                            elevation="2"
                            @input="menuTo = false"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col class="col-3 col-lg-1 d-flex align-center">
                    <v-btn @click="test()" outlined><v-icon>mdi-calendar-remove</v-icon></v-btn>
                </v-col>
            </v-row>
        </div>

        <div class="graph">
            <v-row>
                <v-col class="col-12">
                    <line-chart :chart-data="dataCollection"></line-chart>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
import LineChart from '@/LineChart.js'

export default {
    components: {
      LineChart
    },
    data: () => ({
        chartValue: 'Posts',
        menuFrom: false,
        menuTo: false,
        dateFrom: null,
        dateTo: null,
        dataCollection: null
    }),
    methods: {
        fillData() {
            this.datacollection = {
                labels: [this.getRandomInt(), this.getRandomInt()],
                datasets: [
                    {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [this.getRandomInt(), this.getRandomInt()]
                    }, {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [this.getRandomInt(), this.getRandomInt()]
                    }
                ]
            }
        },
        test() {
            console.log(this.chartValue, this.dateFrom, this.dateTo);
        }
    },
    mounted() {
        this.fillData()
    }
}
</script>

<style scoped>
    .graph {
        background: #f7f7f7;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        margin-bottom: 12px;
    }
    .v-btn {
        width: 100%;
    }
</style>