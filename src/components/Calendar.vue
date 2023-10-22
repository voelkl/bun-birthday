<template>
  <div>
    <div id="calendar-header">
      <button class="button is-primary" @click="previousMonth">Prev</button>
      <span>{{ monthNames[currentMonth] }} {{ currentYear }}</span>
      <button class="button is-primary" @click="nextMonth">Next</button>
    </div>

    <div id="calendar">
      <div class="day-name" v-for="dayName in dayNames" :key="dayName">
        {{ dayName }}
      </div>
      <div
        v-for="day in allDays"
        :key="day.key"
        class="day"
        :class="{
          today:
            day.year === new Date().getFullYear() &&
            day.month === new Date().getMonth() &&
            day.date === new Date().getDate(),
          birthday: hasBirthday(day.year, day.month, day.date),
          'outside-month': day.isOutside,
        }"
        :title="handleDayTitle(day)"
        @click="selectDay(day)"
        @mouseover="selectDay(day)"
      >
        <div class="notification is-primary is-light is-hidden">
          <div class="delete"></div>
          <div v-for="event in selectDay(day)" :key="event.id">
            {{ event.title }}
          </div>
        </div>
        {{ day.date }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    events: Array,
    default: () => [
      {
        name: "Birthday",
        date: "2021-01-01",
        details: "This is a birthday event",
      },
    ],
  },
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
      
      return this.getBirthdaysOfDay(day);
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
    hasBirthday(year, month, day) {
      return this.events.some((event) => {
        const eventDate = new Date(event.date);
        if (eventDate.getMonth() == month && eventDate.getDate() == day) {
          return true;
        }
      });
    },
    handleDayTitle(day) {
      const events = this.getBirthdaysOfDay(day);
      if (events === "No events") {
        return events;
      }
      return events.map((event) => event.title).join(", ");
    },
    getBirthdaysOfDay(day) {
      const events = this.events.filter((event) => {
        const eventDate = new Date(event.date);
        if (
          eventDate.getMonth() == day.month &&
          eventDate.getDate() == day.date
        ) {
          return true;
        }
      });

      if (events.length === 0) {
        return "No events";
      }
      return events;
    },
  },
};
</script>

<style lang="scss">
#calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.day {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid hsl(0, 0%, 48%);
  border-radius: 0.4rem;
  margin: auto;
  cursor: pointer;
  transition: background-color 0.3s;
  padding: .2rem .7rem;
  min-height: 50px;
  min-width: 50px;

  @media (max-width: 996px) {
    padding: 0;
    min-width: initial;
    min-height: initial;
    height: 2.5rem;
    width: 100%;
  }
}

.birthday {
  color: white;
  background-color: hsl(217, 71%, 53%)
}

.day:hover {
  border: 1px solid hsl(171, 100%, 41%);
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

.day-name {
  text-align: center;
  font-weight: bold;
}

.today {
  color: hsl(171, 100%, 41%);
  border: 2px solid hsl(171, 100%, 41%);
}

.today.birthday {
  background-color: plum;
}

.notification {
  position: absolute;
  margin-top: -14rem;
  width: 10rem;
  height: 10rem;
}

.day:hover .notification {
  display: block;
}
</style>
