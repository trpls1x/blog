<template>
    <v-container>
        <div class="wrap">
            <v-row>
                <v-col class="col-12 col-lg-5 pb-0">
                    <v-select
                        v-model="chartValue"
                        :items="accountData ? ['Posts', 'Users', 'Posts by you'] : ['Posts', 'Users']"
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

                <v-col class="col-12 col-sm-5 col-lg-3 pb-0">
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
                            v-if="maxDate"
                            v-model="dateFrom"
                            :min="minDate"
                            :max="dateTo ? dateTo : maxDate.toISOString()"
                            color="#39BEA1"
                            elevation="2"
                            @input="menuFrom = false;"
                            @change="fillData()"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col class="col-12 col-sm-5 col-lg-3 pb-0">
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
                            :min="dateFrom ? dateFrom : minDate"
                            :max="maxDate ? maxDate.toISOString() : ''"
                            color="#39BEA1"
                            elevation="2"
                            @input="menuTo = false"
                            @change="fillData()"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col class="clear col-12 col-sm-2 col-lg-1 d-flex align-stretch">
                    <v-btn outlined @click="clearFilters()">
                        <v-icon>mdi-calendar-remove</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </div>

        <div class="wrap">
            <v-row>
                <v-col class="col-12">
                    <div class="chart-wrap">
                        <div class="chart" :style = "{ width: chartWidth + '%'}">
                            <line-chart :chart-data="dataCollection" :options="chartOptions"></line-chart>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>

        <div class="wrap">
             <v-row>
                <v-col class="col-6">
                    Total days: {{totalDates}}
                </v-col>
                <v-col class="col-6">
                    Total {{chartValue.toLowerCase()}}: {{totalData}}
                </v-col>
            </v-row>
        </div>

        <div class="wrap" v-if="accountData">
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
        chartWidth: 100,
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
            
            this.getDateArray();
            this.getChartData();
            this.setChartWidth();
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
            this.minDate = firstDate
        },
        getDateArray() {
            var start = this.dateFrom ? new Date(this.dateFrom) : this.minDate;
            var end = this.dateTo ? new Date(this.dateTo) : this.maxDate;
            this.datesArray = [];
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
        setChartWidth() {
            this.chartWidth = this.chartData.length * 5;
        },
        clearFilters() {
            this.dateFrom = null;
            this.dateTo = null;
        }
    },
    mounted() {
        this.chartOptions = {
            maintainAspectRatio: false,
            responsive: true
        }
        this.maxDate = new Date();
        this.fillData()
    }
}
</script>

<style scoped>
    .wrap {
        background: #f7f7f7;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
        margin-bottom: 12px;
    }
    .clear .v-btn {
        color: rgb(133, 133, 133);
        width: 100%;
        height: 56px;
    }
    .clear .v-btn:hover {
        color: #000;
    }
    .clear .v-icon {
        color: rgba(0, 0, 0, 0.54);
    }
    .chart-wrap {
        height: 60vh;
        overflow: scroll;
        overflow-y: hidden;
    }
    .chart-wrap * {
        height: 100%;
        width: 100%;
    }
    .chart {
        position: relative;
        min-width: 100%;
    }
    ::-webkit-scrollbar {
        height: 5px;
        box-shadow: inset 0 0 6px rgba(0,0,0,0.1); 
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1); 
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: #39BEA1;
        opacity: .5;
    }
</style>