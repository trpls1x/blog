<template>
  <div class="wrap d-flex justify-center align-center">
    <RingLoader :color="'#F7F7F7'"/>
  </div>
</template>

<script>
import { RingLoader } from 'vue-spinners-css'
export default {
  components: {
    RingLoader
  }
}
</script>

<style scoped>
</style>