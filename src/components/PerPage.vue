<template>
  <select v-model="perPage" class="form-control">
    <option v-for="val in options" :value="val">{{ val }}</option>
  </select>
</template>

<script>
import options from '../options'

export default {
  props: {
    value: {
      type: Number,
      required: true
    },

    options: {
      type: Array,
      default: () => options.perPageOptions
    }
  },

  data: () => ({ perPage: options.perPage }),

  created () {
    this.perPage = this.value
  },

  watch: {
    perPage (val) {
      this.$emit('input', val)
    }
  }
}
</script>
