<template>
    <v-row>
        <v-col class="col-6">
            <div class="d-flex justify-space-between align-center">  
                <h2>Posts comparing:</h2>
                <v-switch
                    v-model="switchValue"
                    color="#39BEA1"
                    inset
                    hide-details="auto"
                    label="Percentage"
                ></v-switch>
            </div>
            <doughnut-chart :chart-data="datacollection" :options="chartOptions"></doughnut-chart>
        </v-col>
        <v-col class="col-6">
            <h2>Stats:</h2>
            <table>
                <tbody>
                    <tr><td>Total posts:</td><td>{{postsByUser}}</td></tr>
                    <tr><td>Total likes:</td><td>{{likesData.total}}</td></tr>
                    <tr><td>Unique likes:</td><td>{{likesData.unique}}</td></tr>
                    <tr><td>Average likes:</td><td>{{likesData.average}}</td></tr>
                </tbody>
            </table>
        </v-col>
    </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DoughnutChart from '@/DoughnutChart.js'

export default {
    components: {
        DoughnutChart
    },
    data: () => ({
        switchValue: false,
        totalPosts: 0,
        postsByUser: 0,
        data: [],
        percentageData: [],
        chartOptions: {},
        datacollection: {},
        likes: {},
        likesData: {
            total: null,
            unique: null,
            average: null
        }

    }),
    computed: mapGetters(['postsPagination', 'accountData', 'posts']),
    watch: {
        switchValue(value) {
            if(value) {
                this.fillData(this.percentageData)
            } else {
                this.fillData(this.data)
            }
        }
    },
    methods: {
        ...mapActions(['fetchPosts']),
        fillData(chartData) {
            this.datacollection = {
                labels: ['Posts by you', 'Posts by other users'],
                datasets: [{
                        backgroundColor: ['#f87979', '#39BEA1'],
                        data: chartData
                    }
                ]
            }
        },
        countLikes() {
            this.posts.forEach(post => {
                post.likes.forEach(like => {
                    if(this.likes[like]) {
                        this.likes[like]++
                    } else {
                        this.likes[like] = 1
                    }
                })
            });

            this.likesData.total = Object.values(this.likes).reduce((a, b) => a + b);
            this.likesData.unique = Object.keys(this.likes).length;
            this.likesData.average = (this.likesData.total / this.postsByUser).toFixed(2)
        }
    },
    async mounted () {
        await this.fetchPosts({limit: 1});
        this.totalPosts = this.postsPagination.total
        await this.fetchPosts({limit: 0, postedBy: this.accountData._id})
        this.postsByUser = this.postsPagination.total

        this.data = [this.postsByUser, this.totalPosts - this.postsByUser]
        this.percentageData[0] =((this.postsByUser * 100) / this.totalPosts).toFixed(2)
        this.percentageData[1] = (100 - this.percentageData[0]).toFixed(2)
        
        // this.chartOptions = {
        //     tooltips: {
        //         callbacks: {
        //             label: function(tooltipItem, data) {
        //                 return data.labels[tooltipItem.index] + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + '%';
        //             }
        //         }
        //     }   
        // }
        this.countLikes()
        this.fillData(this.data) 
    },
} 
</script>

<style scoped>
    .v-input--selection-controls {
        margin: 0 !important;
        padding: 0 !important;
    }
    table td:nth-child(2) {
        padding-left: 15px;
    }
    table {
        font-size: 1.2rem;
    }
    #doughnut-chart {
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%);
    }
</style>