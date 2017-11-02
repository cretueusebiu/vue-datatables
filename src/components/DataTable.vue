<template>
  <div>
    <table :class="tableClass" ref="table">
      <thead>
        <tr>
          <template v-for="column in _columns" v-if="column.visible">
            <template v-if="isSpecialColumn(column)">
              <th v-if="extractName(column) === '__checkbox'" :class="column.titleClass">
                <input type="checkbox" @change="toggleAllCheckboxes($event, column)">
              </th>
              <th v-else :class="column.titleClass" v-html="column.title"></th>
            </template>
            <th v-else :id="`_${column.name}`" :class="column.titleClass" v-html="column.title"></th>
          </template>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import $ from 'jquery'

import defaults from '../options'
import { call, validCallable } from '../util'

export default {
  props: {
    actions: {
      type: Array,
      default: () => []
    },

    ajax: Function,

    columns: {
      type: Array,
      required: true
    },

    dom: {
      type: String,
      default: defaults.dom
    },

    initOnStart: {
      type: Boolean,
      default: true
    },

    language: {
      type: Object,
      default: () => defaults.language
    },

    order: Array,

    options: {
      type: Object,
      default: () => {}
    },

    params: {
      type: Object,
      default: () => {}
    },

    perPage: {
      type: Number,
      default: defaults.perPage
    },

    responsive: {
      type: Boolean,
      default: true
    },

    search: String,

    serverSide: {
      type: Boolean,
      default: true
    },

    tableClass: {
      type: String,
      default: defaults.tableClass
    },

    url: String
  },

  watch: {
    search (val) {
      this.dataTable.search(val).draw()
    },

    perPage (val) {
      this.dataTable.page.len(val).draw()
    },

    params () {
      this.draw()
    }
  },

  data: () => ({
    _columns: [],
    dataTable: null
  }),

  created () {
    this.normalizeColumns()
  },

  mounted () {
    if (this.initOnStart) {
      this.init()
    }
  },

  methods: {
    /**
     * Initialize DataTable.
     */
    init () {
      const table = $(this.$refs.table)
      this.dataTable = table.DataTable(this.mergeOptions())
      this.dataTable.on('click', '.dt-action', (e) => this.handleActionClick(e))
    },

    /**
     * Redraw the table.
     */
    draw () {
      this.dataTable.draw()
    },

    /**
     * Get the options for DataTable.
     *
     * @return {Object}
     */
    mergeOptions () {
      const options = {
        autoWidth: false,
        order: this.order,
        columns: this.dtColumns(),
        language: this.language,
        serverSide: this.serverSide,
        responsive: this.responsive,
        renderer: 'bootstrap',
        dom: this.dom
      }

      if (typeof this.ajax === 'function') {
        options.ajax = this.ajax.bind(this)
      } else if (Vue.http && typeof defaults.ajax === 'function') {
        options.ajax = defaults.ajax.bind(this)
      } else {
        options.ajax = this.url
      }

      return { ...this.options, ...options }
    },

    /**
     * Normalize each column object.
     */
    normalizeColumns () {
      this._columns = this.columns.map(column => {
        let obj

        if (typeof (column) === 'string') {
          obj = {
            name: column,
            title: this.getTitle(column),
            titleClass: undefined,
            render: undefined,
            visible: true
          }
        } else {
          obj = {
            ...column,
            name: column.name,
            title: this.getTitle(column),
            titleClass: column.titleClass,
            render: column.render,
            visible: (column.visible === undefined) ? true : column.visible
          }
        }

        if (obj.render === undefined) {
          if (this.extractName(obj) === '__actions') {
            obj = {
              ...obj,
              orderable: false,
              searchable: false,
              render: (...args) => this.renderActions.apply(this, args)
            }
          } else {
            if (column.formatter) {
              if (!validCallable(column.formatter)) {
                throw new Error(
                  `Formatter for column ${column.name} must be a function or array.`
                )
              }

              obj.render = (data, type, row, meta) => call(
                column.formatter, [row, data, type, meta], this
              )
            }
          }
        }

        return obj
      })
    },

    /**
     * Determine if the given column is special.
     *
     * @param  {Object} column
     * @return {Boolean}
     */
    isSpecialColumn (column) {
      return column.name.startsWith('__')
    },

    /**
     * Get column title.
     *
     * @param  {Object|String} column
     * @return {String}
     */
    getTitle (column) {
      if (typeof column === 'string') {
        if (column === '__actions') {
          return 'Actions'
        }

        return this.titleCase(column)
      }

      if (column.title === undefined) {
        return this.titleCase(column.name.replace('.', ' '))
      }

      return column.title
    },

    /**
     * @param  {String} str
     * @return {String}
     */
    titleCase (str) {
      return str.replace(/\w+/g, s => s.charAt(0).toUpperCase() + s.substr(1).toLowerCase())
    },

    /**
     * Extract column name.
     *
     * @param  {Object} column
     * @return {String}
     */
    extractName (column) {
      return column.name.split(':')[0].trim()
    },

    /**
     * Extract column args.
     *
     * @param  {Object} column
     * @return {String}
     */
    extractArgs (column) {
      return column.name.split(':')[1]
    },

    /**
     * @param {Event} e
     * @param {Object} column
     */
    toggleAllCheckboxes (e, column) {
      console.log(e, column)
    },

    /**
     * Render column actions.
     *
     * @return {String}
     */
    renderActions (...args) {
      const html = [''].concat(this.actions)
        .reduce((result, action, index) =>
          result + this.renderAction(...[index - 1, ...args])
        )

      return `<div class="dt-actions">${html}</div>`
    },

    /**
     * Render a row action.
     *
     * @param  {Number} index
     * @param  {Any} data
     * @param  {String} type
     * @param  {Any} row
     * @param  {Object} meta
     * @return {String}
     */
    renderAction (index, data, type, row, meta) {
      const action = this.actions[index]

      if (action.if === false) {
        return ''
      } else if (action.if !== undefined) {
        if (!validCallable(action.if)) {
          throw new Error('Action if must be a function or array.')
        }

        if (call(action.if, [row, data, type, meta], this) === false) {
          return ''
        }
      }

      let tagName = 'span'

      if (action.href) {
        tagName = 'a'
      } else if (action.button) {
        tagName = 'button'
      }

      const element = document.createElement(tagName)

      if (tagName === 'button') {
        element.setAttribute('type', 'button')
      } else if (tagName === 'a') {
        if (action.target) {
          element.setAttribute('target', action.target)
        }

        element.setAttribute('href', action.href ? action.href : '#')
      }

      if (action.class) {
        element.className = action.class
      }

      element.classList.add('dt-action')

      if (action.title) {
        element.setAttribute('title', action.title)
      }

      element.dataset.actionRow = meta.row
      element.dataset.actionIndex = index

      if (action.icon) {
        const icon = document.createElement('i')
        icon.className = action.icon
        element.appendChild(icon)
      }

      if (action.label) {
        element.appendChild(document.createTextNode((action.icon ? ' ' : '') + action.label))
      }

      if (action.render) {
        if (!validCallable(action.render)) {
          throw new Error('Action render must be a function or array.')
        }

        const response = call(action.render, [element, row, data, type, meta], this)

        if (response !== undefined) {
          return response
        }
      }

      return element.outerHTML
    },

    /**
     * Handle action click event.
     *
     * @param {Event} e
     */
    handleActionClick (e) {
      const el = e.currentTarget
      const action = this.actions[+el.dataset.actionIndex]
      const row = this.dataTable.row(+el.dataset.actionRow)

      if (el.tagName === 'A') {
        return
      }

      if (action.click) {
        if (!validCallable(action.click)) {
          throw new Error('Action click must be a function or array.')
        }

        call(action.click, [row.data(), row], this)
      }
    },

    /**
     * Get the columns with attributes for DataTable.
     *
     * @return {Array}
     */
    dtColumns () {
      return this._columns.map(column => {
        const options = {}

        if (!this.isSpecialColumn(column)) {
          options.name = column.name
          options.data = column.data || column.name
        }

        return {
          ...options,
          render: column.render,
          visible: column.visible,
          orderable: column.orderable === undefined ? true : column.orderable,
          searchable: column.searchable === undefined ? true : column.searchable
        }
      })
    }
  }
}
</script>
