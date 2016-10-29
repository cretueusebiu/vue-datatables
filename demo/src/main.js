import Vue from 'vue'
import $ from 'jquery'
require('datatables.net-bs')(window, $)
import VueResource from 'vue-resource'
import VueDataTables from '../../src/main'
// import VueDataTables from 'vue-datatables'

import App from './App.vue'

Vue.use(VueResource)
Vue.use(VueDataTables)

new Vue({
  el: '#app',
  render: h => h(App)
})
