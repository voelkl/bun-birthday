<template>
  <div class="mb-2">
    <h2 class="subtitle mb-1">Filter by date</h2>
    <div class="columns">
      <div class="column">
        <label for="startDate">Start Date:</label>
        <input type="date" id="startDate" v-model="startDate" @input="filterEventsByDate" />
      </div>

      <div class="column">
        <label for="endDate">End Date:</label>
        <input type="date" id="endDate" v-model="endDate" @input="filterEventsByDate" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: "",
      endDate: "",
    };
  },
  methods: {
    filterEventsByDate() {
      this.$emit("filterEventsByDate", this.startDate, this.endDate)
    }
  }
}
</script>
