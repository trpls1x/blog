<template>
  <v-app>
    <v-main>
      <Loader v-if="isLoading"/>
      <router-view v-else/>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import Loader from '@/components/Loader'

export default {
  name: 'App',
  components: {
    Loader
  },
  computed: mapGetters(['isLoading']),
  methods: {
    ...mapActions(['getAccountData'])
  },
  async created() {
    if(localStorage.getItem('token')) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
      await this.getAccountData();
    }
  }
};
</script>

<style scoped>
  #app {
      background: #39BEA1;
  }
</style>
