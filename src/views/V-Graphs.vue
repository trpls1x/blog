<template>
    <v-container>
        <div class="graph">
            <v-row>
                <v-col class="col-9 col-lg-5">
                    <v-select
                        v-model="chartValue"
                        :items="accountData ? ['Posts', 'Users', 'Posts by you'] : ['posts', 'users']"
                        :menu-props="{offsetY: true }"
                        item-color="#39BEA1"
                        label="Select"
                        color="#39BEA1"
                        hide-details="auto"
                        outlined
                        single-line
                        @change="fillData()"
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
                            :min="minDate"
                            :max="maxDate ? maxDate.toISOString() : ''"
                            color="#39BEA1"
                            elevation="2"
                            @input="menuFrom = false;"
                            @change="fillData()"

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
                            :min="minDate"
                            :max="maxDate ? maxDate.toISOString() : ''"
                            color="#39BEA1"
                            elevation="2"
                            @input="menuTo = false"
                            @change="fillData()"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col class="col-3 col-lg-1 d-flex align-center">
                    <v-btn outlined @click="clearFilters()"><v-icon>mdi-calendar-remove</v-icon></v-btn>
                </v-col>
            </v-row>
        </div>

        <div class="graph">
            <v-row>
                <v-col class="col-12">
                    <div class="chart-wrap">
                        <line-chart :chart-data="dataCollection" :options="chartOptions"></line-chart>
                    </div>
                </v-col>
            </v-row>
        </div>

        <div class="graph">
             <v-row>
                <v-col class="col-6">
                    Total days: {{totalDates}}
                </v-col>
                <v-col class="col-6">
                    Total {{chartValue.toLowerCase()}}: {{totalData}}
                </v-col>
            </v-row>
        </div>

        <div class="graph">
            <PostsGraph/>
        </div>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import LineChart from '@/LineChart.js'
import PostsGraph from '@/components/GraphsComponents/PostsGraph'

export default {
    components: {
      LineChart,
      PostsGraph
    },
    data: () => ({
        chartValue: 'Posts',
        menuFrom: false,
        menuTo: false,
        dateFrom: null,
        dateTo: null,
        minDate: null,
        maxDate: null,
        totalDates: 0,
        totalData: 0,
        datesArray: [],
        chartData:[],
        chartOptions: {},
        dataCollection: {}
    }),
    computed: mapGetters(['posts', 'users', 'accountData']),
    watch: {
        dateFrom() {
            this.fillData()
        }
    },
    methods: {
        ...mapActions(['fetchPosts', 'fetchUsers']),
        async fillData() {
            if(this.chartValue == 'Posts') {
                await this.fetchPosts({limit: 0});
                this.setMinDate(this.posts[0].dateCreated.split('T')[0]);
            } else if (this.chartValue == 'Users') {
                await this.fetchUsers({limit: 0});
                this.setMinDate(this.users[0].dateCreated.split('T')[0]);
            } else {
                await this.fetchPosts({limit: 0, postedBy: this.accountData._id});
                this.setMinDate(this.posts[0].dateCreated.split('T')[0]);
            }
            
            this.getDateArray(this.minDate, this.maxDate)
            this.getChartData()

            this.dataCollection = {
                labels: this.datesArray,
                datasets: [{
                        label: this.chartValue,
                        borderColor: '#39BEA1',
                        backgroundColor: 'transparent',
                        data: this.chartData
                    }
                ]
            }
        },
        setMinDate(firstDate){
            if(this.dateFrom) {
                this.minDate = this.dateFrom
            } else {
                this.minDate = firstDate
            }
        },
        getDateArray(start, end) {
            this.datesArray = []
            var dt = new Date(start);
            while (dt <= end) {
                this.datesArray.push(new Date(dt).toISOString().split('T')[0]);
                dt.setDate(dt.getDate() + 1);
            }
            this.totalDates = this.datesArray.length
        },
        getChartData() {
            this.chartData = [];
            this.totalData = 0;
            this.datesArray.forEach(date => {
                var k = 0
                if(this.chartValue == 'Posts' || this.chartValue == 'Posts by you') {
                    k = this.posts.filter(element => element.dateCreated.split('T')[0] == date).length ;
                } else if (this.chartValue == 'Users') {
                    k = this.users.filter(element => element.dateCreated.split('T')[0] == date).length ;
                }
                this.chartData.push(k)
                this.totalData += k;
            });
        },
        clearFilters() {
            this.dateFrom = null;
            this.dateTo = null;
        }
    },
    mounted() {
        this.chartOptions = {
            maintainAspectRatio: false,
            responsive: true, 
        }
        this.maxDate = new Date();
        this.fillData()
    }
}
</script>

<style scoped>
    .graph {
        background: #f7f7f7;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        margin-bottom: 12px;
    }
    .v-btn {
        width: 100%;
    }
    .chart-wrap {
        height: 60vh;
    }
    .chart-wrap * {
        height: 100%;
        width: 100%;
    }
</style>