<template>
  <input v-model="query" type="search" class="form-control" :placeholder="placeholder" autocomplete="off">
</template>

<script>
import options from '../options'

export default {
  props: {
    value: {
      required: true
    },

    placeholder: {
      type: String,
      default: options.language.searchPlaceholder
    }
  },

  data: () => ({ query: '' }),

  created () {
    this.query = this.value
  },

  watch: {
    query (val) {
      this.$emit('input', val)
    }
  }
}
</script>
