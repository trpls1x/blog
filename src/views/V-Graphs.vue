<template>
    <v-container>
        <div class="wrap pa-5 mb-3">
            <v-row>
                <v-col class="col-12 col-lg-5 pb-0">
                    <v-select
                        v-model="chartValue"
                        :items="accountData ? ['Posts', 'Users', 'Your Posts'] : ['Posts', 'Users']"
                        :menu-props="{offsetY: true }"
                        item-color="#39BEA1"
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

        <div class="wrap pa-5 mb-3">
            <v-row>
                <v-col class="col-12">
                    <div class="chart-wrap" v-dragscroll="true">
                        <div class="chart" :style = "{ width: chartWidth + '%'}">
                            <line-chart :chart-data="dataCollection" :options="chartOptions"></line-chart>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </div>

        <div class="wrap pa-5 mb-3">
             <v-row>
                <v-col class="col-6">
                    Total days: {{ totalDates }}
                </v-col>
                <v-col class="col-6">
                    Total {{ chartValue.toLowerCase() }}: {{ totalData }}
                </v-col>
            </v-row>
        </div>

        <div class="wrap pa-5 mb-3" v-if="accountData">
            <PostsGraph/>
        </div>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { dragscroll } from 'vue-dragscroll'
import LineChart from '@/LineChart.js'
import PostsGraph from '@/components/GraphsComponents/PostsGraph'

export default {
    directives: {
        dragscroll
    },
    components: {
      LineChart,
      PostsGraph
    },
    data: () => ({
        chartValue: 'Posts',
        // items: [
        //     { text: 'Posts', value: 'posts'},
        //     { text: 'Users', value: 'users'},
        //     { text: 'Your Posts', value: 'posts'},
        // ],
        datesArray: [],
        chartData:[],
        chartOptions: {},
        dataCollection: {},
        chartWidth: 100,
        totalDates: 0,
        totalData: 0,
        dateFormat: 'dd-MM-yyyy',
        dateFrom: null,
        dateTo: null,
        minDate: null,
        maxDate: null,
        menuFrom: false,
        menuTo: false,
    }),
    computed: mapGetters(['posts', 'users', 'accountData']),
    mounted() {
        this.chartOptions = {
            maintainAspectRatio: false,
            responsive: true
        };
        this.maxDate = new Date();
        this.fillData();
    },
    methods: {
        ...mapActions(['fetchPosts', 'fetchUsers']),
        async fillData() {
            let conf = { limit: 0 };
            conf.postedBy = this.chartValue === 'Your Posts' ? this.accountData._id : '';

            let arrayType = this.chartValue === 'Users' ? 'users' : 'posts';

            this.chartValue === 'Users' ? await this.fetchUsers(conf) : await this.fetchPosts(conf);
            this.minDate = this[arrayType][0].dateCreated;
            
            this.getDatesArray();
            this.getChartData(arrayType);
            this.chartWidth = this.chartData.length * 5;

            this.dataCollection = {
                labels: this.datesArray,
                datasets: [{
                        label: this.chartValue,
                        borderColor: '#39BEA1',
                        backgroundColor: 'transparent',
                        data: this.chartData
                    }
                ]
            };
        },
        getDatesArray() {
            const start = this.dateFrom ? this.dateFrom : this.minDate;
            const end = this.dateTo ? new Date(this.dateTo) : this.maxDate;
            this.datesArray = [];
            let dt = new Date(start);
            dt.setHours(0,0,0,0);
            while (dt <= end) {
                this.datesArray.push(this.$luxon(dt.toISOString(), this.dateFormat));
                dt.setDate(dt.getDate() + 1);
            }
            this.totalDates = this.datesArray.length;
        },
        getChartData(arrayType) {
            this.chartData = [];
            this.totalData = 0;

            this.datesArray.forEach(date => {
                let k = 0;
                k = this[arrayType].filter(item => this.$luxon(item.dateCreated, this.dateFormat) === date).length;
                this.chartData.push(k);
                this.totalData += k;
            });
        },
        clearFilters() {
            this.dateFrom = null;
            this.dateTo = null;
            this.fillData();
        }
    }
}
</script>

<style lang="sass" scoped>
    .wrap 
        background: $main-white
        @extend %card
    
    .clear 
        .v-btn 
            color: rgb(133, 133, 133)
            width: 100%
            height: 56px
    
            &:hover 
                color: #000

        .v-icon 
            color: rgba(0, 0, 0, 0.54)
    
    .chart-wrap 
        height: 60vh
        overflow: scroll
        overflow-y: hidden

        &:hover
            cursor: w-resize

        * 
            height: 100%
            width: 100%

    .chart 
        position: relative
        min-width: 100%
    
    ::-webkit-scrollbar 
        height: 5px
        box-shadow: inset 0 0 6px rgba(0,0,0,0.1)
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1)
        border-radius: 10px
    
    ::-webkit-scrollbar-thumb 
        border-radius: 10px
        background: $main-green
        opacity: .5
    
</style>