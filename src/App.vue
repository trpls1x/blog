<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions(['getAccountData'])
  },
  async created() {
    if(localStorage.getItem('token')) {
      await this.getAccountData();
    }
  }
};
</script>

<style lang="sass" scoped>
  #app 
    background: $main-green
</style>
