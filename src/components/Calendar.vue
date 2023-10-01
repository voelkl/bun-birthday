<template>
  <div>
    <div id="calendar-header">
      <button
          ref="prev-month"
          class="button"
          id="prev-month"
          @click="handlePrevClick"
      >Prev
      </button>
      <span ref="current-month-year" id="current-month-year"></span>
      <button
          ref="next-month"
          class="button"
          id="next-month"
          @click="handleNextClick"
      >Next
      </button>
    </div>
    <div ref="calendar" id="calendar">
      <!-- Will be populated by JavaScript -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  props: {
    events: Array
  },
  data() {
    return {
      currentMonth: "",
      currentYear: ""
    }
  },
  mounted() {
    this.currentMonth = new Date().getMonth()
    this.currentYear = new Date().getFullYear()

    // Initial render
    this.renderCalendar(this.currentMonth, this.currentYear);
  },
  methods: {
    handlePrevClick() {
      this.currentMonth = --this.currentMonth;
      if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear = --this.currentYear;
      }
      this.renderCalendar(this.currentMonth, this.currentYear);
    },
    handleNextClick() {
      this.currentMonth = ++this.currentMonth;
      if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear = ++this.currentYear;
      }
      this.renderCalendar(this.currentMonth, this.currentYear);
    },
    handleDayClick(day, month, year) {
      alert(`Selected date: ${year}-${month + 1}-${day}`);
    },
    renderCalendar(month, year) {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      this.$refs.calendar.innerHTML = ''; // Clear the calendar

      // Display day names
      for (const dayName of dayNames) {
        const dayNameDiv = document.createElement('div');
        dayNameDiv.textContent = dayName;
        dayNameDiv.classList.add('day-name');
        this.$refs.calendar.appendChild(dayNameDiv);
      }

      // Find out the day of the week for the 1st of the current month
      const firstDayOfMonth = new Date(year, month, 1).getDay();

      // Get the number of days in the previous month
      const daysInPreviousMonth = new Date(year, month, 0).getDate();

      // Display last few days of the previous month
      let prevMonth = month - 1;
      let prevYear = year;
      if (prevMonth < 0) {
        prevMonth = 11;
        prevYear--;
      }
      for (let i = daysInPreviousMonth - firstDayOfMonth + 1; i <= daysInPreviousMonth; i++) {
        const dayElem = document.createElement('div');
        dayElem.classList.add('day', 'outside-month');
        dayElem.textContent = i;
        dayElem.addEventListener('click', () => this.handleDayClick(i, prevMonth, prevYear));
        this.$refs.calendar.appendChild(dayElem);
      }

      const daysInMonth = new Date(year, month + 1, 0).getDate();

      // Display days of the current month
      for (let i = 1; i <= daysInMonth; i++) {
        const dayElem = document.createElement('div');
        dayElem.classList.add('day');
        dayElem.textContent = i;
        dayElem.addEventListener('click', () => this.handleDayClick(i, month, year));
        this.$refs.calendar.appendChild(dayElem);
      }

      // Display the initial days of the next month if necessary
      let nextMonth = month + 1;
      let nextYear = year;
      if (nextMonth > 11) {
        nextMonth = 0;
        nextYear++;
      }
      const daysAlreadyDisplayed = firstDayOfMonth + daysInMonth;
      for (let i = 1; i <= 7 - daysAlreadyDisplayed % 7 && daysAlreadyDisplayed % 7 !== 0; i++) {
        const dayElem = document.createElement('div');
        dayElem.classList.add('day', 'outside-month');
        dayElem.textContent = i;
        dayElem.addEventListener('click', () => this.handleDayClick(i, nextMonth, nextYear));
        this.$refs.calendar.appendChild(dayElem);
      }

      // Update the current month and year display
      this.$refs["current-month-year"].textContent = `${monthNames[month]} ${year}`;
    },
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

.day:hover {
  background-color: #e9e9e9;
}

.day.clicked {
  background-color: #b2d7ff;
}

.outside-month {
  background-color: hsl(0, 0%, 86%);
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