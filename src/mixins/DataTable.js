export default {
    events: {
        'vue-datatables:action': function (action, row, index) {
            const func = `${action}Action`;

            if (typeof this[func] === 'function') {
                this[func](row, index);
            }
        }
    },

    methods: {
        /**
         * Initialize DataTables.
         */
        initDataTable() {
            this.$broadcast('vue-datatables:init');
        },

        /**
         * Refresh DataTables.
         */
        refreshDataTable() {
            this.$broadcast('vue-datatables:refresh');
        }
    }
}
