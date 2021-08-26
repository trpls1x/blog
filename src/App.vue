<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({

  }),
};
</script>

<style scoped>
  #app {
      background: #39BEA1;
  }
</style>
