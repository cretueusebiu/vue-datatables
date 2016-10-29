import { merge } from './options'
import Search from './components/Search.vue'
import Filter from './components/Filter.vue'
import PerPage from './components/PerPage.vue'
import DataTable from './components/DataTable.vue'

export default {
  install (Vue, options = {}) {
    merge(options)

    Vue.component('datatable', DataTable)
    Vue.component('datatable-filter', Filter)
    Vue.component('datatable-search', Search)
    Vue.component('datatable-perpage', PerPage)
  }
}
