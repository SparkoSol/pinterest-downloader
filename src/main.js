import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// importing styles
import './assets/styles.css'

Vue.config.productionTip = false

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://10.20.20.101:3000'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
