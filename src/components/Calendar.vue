<template>
  <div ref="bun-calendar" id="bun-calendar"></div>
</template>

<script>
export default {
  name: "Calendar",
  props: {
    events: Array
  },
  mounted() {
    this.initCalendar();
    this.highlightDays()
  },
  methods: {
    initCalendar() {
      // Create the calendar
      window.bunCalendar = window.jsCalendar.new(
        this.$refs["bun-calendar"],
        Date.now()
      );
      window.bunCalendar.onDateClick(function (event, date) {
        console.log(event, date);
      });
    },
    highlightDays(dateString) {
      // Convert the string to a jsCalendar date object
      let date = window.jsCalendar.tools.parseDate(dateString);
      // Update the specific date with new style
      window.bunCalendar.select([date]);
    },
  },
};
</script>

<style>
</style>