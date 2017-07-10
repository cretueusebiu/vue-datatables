<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <h3><a href="https://github.com/cretueusebiu/vue-datatables">vue-datatables</a></h3>
        </div>

        <div class="col-sm-6 text-right">
          <div class="inline-block">
            <datatable-perpage v-model="perPage"></datatable-perpage>
          </div>
          <div class="inline-block">
            <datatable-search v-model="search"></datatable-search>
          </div>
        </div>
      </div>

      <datatable
        ref="table"
        url="https://cdn.rawgit.com/davismiculis/vue-datatables/7e7b934f/demo/static/users.json"
        :columns="columns"
        :actions="actions"
        :search="search"
        :per-page="perPage"
        :server-side="false"
      ></datatable>
    </div>
  </div>
</template>

<script>
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default {
  name: 'app',

  data () {
    return {
      search: '',
      perPage: 10,

      columns: [
        { name: 'name', data: 'name', title: 'Name' },
        { name: 'position', data: 'position', title: 'Position' },
        { name: 'salary', data: 'salary', title: 'Salary' },
        { name: 'start_date', data: 'start_date', title: 'Start Date', formatter: [this, 'startDateFormatter'] },
        { name: 'office', data: 'office', title: 'Office' },
        { name: 'extn', data: 'extn', title: 'Extn' },
        { name: '__actions', title: '' }
      ],

      actions: [
        { title: 'View', icon: 'glyphicon glyphicon-eye-open', class: 'action action-primary', click: [this, 'viewAction'] },
        { title: 'Edit', icon: 'glyphicon glyphicon-pencil', class: 'action action-primary', click: [this, 'editAction'] },
        { title: 'Delete', icon: 'glyphicon glyphicon-trash', class: 'action action-danger', click: [this, 'deleteAction'] }
      ]
    }
  },

  methods: {
    /**
     * Column formatter
     */
    startDateFormatter (user) {
      const date = new Date(user.start_date)

      return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    },

    /**
     * Column view action.
     */
    viewAction (user) {
      console.log('viewAction', user)
    },

    /**
     * Column edit action.
     */
    editAction (user) {
      console.log('editAction', user)
      // this.$refs.table.draw()
    },

    /**
     * Column delete action.
     */
    deleteAction (user) {
      console.log('deleteAction', user)
      // this.$refs.table.draw()
    }
  }
}
</script>

<style lang="scss">
@import './sass/app';

h3 {
  margin: 0px;
}

.dataTables_wrapper {
  margin-top: 20px;

  tbody td:last-child {
    text-align: center;
  }
}
</style>
