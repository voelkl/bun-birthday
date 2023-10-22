<template>
  <div>
    <input
      class="input is-primary mb-3"
      type="text"
      placeholder="Filter by name"
      v-model="filterText"
      @input="emitFilter"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterText: "",
    };
  },
  methods: {
    emitFilter() {
      this.$emit("filter", this.filterText);
    },
  },
};
</script>

<style>

</style>
