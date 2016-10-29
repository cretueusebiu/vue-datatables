import Vue from 'vue'

const defaults = {
  dom: `
    <'row'<'col-sm-12'tr>>
    <'row'<'col-sm-5'i><'col-sm-7'p>>
  `,

  language: {
    search: '_INPUT_',
    searchPlaceholder: 'Search...',
    lengthMenu: '_MENU_',
    paginate: {
      previous: '&laquo;',
      next: '&raquo;'
    }
  },

  perPage: 10,

  perPageOptions: [10, 25, 50, 75, 100],

  tableClass: 'table table-bordered table-striped table-hover dtr-inline',

  /**
   * Use vue-resource instead of jQuery.
   *
   * @param {Object}   data
   * @param {Function} callback
   * @param {Object}   settings
   */
  ajax (data, callback) {
    const params = { ...this.params, ...data }

    // vue-resource bug
    // https://github.com/vuejs/vue-resource/pull/449
    params._length = params.length
    delete params.length

    Vue.http.get(this.url, { params }).then(({ body }) => {
      callback(body)
    })
  }
}

/**
 * Merge the given options into the default options.
 *
 * @param {Object} options
 */
const merge = function merge (options) {
  Object.assign(defaults, options)
}

export { merge }
export default defaults
