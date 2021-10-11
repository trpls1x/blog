import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router'
import store from '@/store'

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
