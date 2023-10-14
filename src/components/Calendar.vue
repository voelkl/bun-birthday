<template>
  <div>
    <div id="calendar-header">
      <button class="button" @click="previousMonth">Prev</button>
      <span>{{ monthNames[currentMonth] }} {{ currentYear }}</span>
      <button class="button" @click="nextMonth">Next</button>
    </div>

    <div id="calendar">
      <div class="day-name" v-for="dayName in dayNames" :key="dayName">
        {{ dayName }}
      </div>
      <div
        v-for="day in allDays"
        :key="day.key"
        class="day"
        :class="{ 'outside-month': day.isOutside }"
        @click="selectDay(day)"
      >
        {{ day.date }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      allDays: [],
    };
  },
  mounted() {
    this.generateDays();
  },
  methods: {
    selectDay(day) {
      alert(`Selected date: ${day.year}-${day.month + 1}-${day.date}`);
    },
    previousMonth() {
      this.currentMonth--;
      if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear--;
      }
      this.generateDays();
    },
    nextMonth() {
      this.currentMonth++;
      if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
      }
      this.generateDays();
    },
    generateDays() {
      const days = [];

      const firstDayOfMonth = new Date(
        this.currentYear,
        this.currentMonth,
        1
      ).getDay();
      const daysInPreviousMonth = new Date(
        this.currentYear,
        this.currentMonth,
        0
      ).getDate();
      const daysInMonth = new Date(
        this.currentYear,
        this.currentMonth + 1,
        0
      ).getDate();

      let prevMonth = this.currentMonth - 1;
      let prevYear = this.currentYear;
      if (prevMonth < 0) {
        prevMonth = 11;
        prevYear--;
      }
      for (
        let i = daysInPreviousMonth - firstDayOfMonth + 1;
        i <= daysInPreviousMonth;
        i++
      ) {
        days.push({
          date: i,
          month: prevMonth,
          year: prevYear,
          isOutside: true,
          key: `${prevYear}-${prevMonth}-${i}`,
        });
      }

      for (let i = 1; i <= daysInMonth; i++) {
        days.push({
          date: i,
          month: this.currentMonth,
          year: this.currentYear,
          isOutside: false,
          key: `${this.currentYear}-${this.currentMonth}-${i}`,
        });
      }

      let nextMonth = this.currentMonth + 1;
      let nextYear = this.currentYear;
      if (nextMonth > 11) {
        nextMonth = 0;
        nextYear++;
      }
      for (
        let i = 1;
        i <= 7 - ((firstDayOfMonth + daysInMonth) % 7) &&
        (firstDayOfMonth + daysInMonth) % 7 !== 0;
        i++
      ) {
        days.push({
          date: i,
          month: nextMonth,
          year: nextYear,
          isOutside: true,
          key: `${nextYear}-${nextMonth}-${i}`,
        });
      }

      this.allDays = days;
    },
  },
};
</script>

<style>
#calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.day {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid hsl(0, 0%, 48%);
  margin: auto;
  cursor: pointer;
  transition: background-color 0.3s;
}

.birthday {
  background-color: yellow;
}

.day:hover {
  background-color: #e9e9e9;
}

.outside-month {
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 0.5;
}

#calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

#calendar-header button {
  background-color: #b2d7ff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

#calendar-header button:hover {
  background-color: #7faee3;
}

.day-name {
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
