<template>
  <select v-model="selected" class="form-control">
    <option v-for="(key, value) in options" :value="value">
      {{ key }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    value: {
      required: true
    },

    options: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({ selected: '' }),

  created () {
    this.selected = this.value
  },

  watch: {
    selected (val) {
      this.$emit('input', val)
    }
  }
}
</script>
