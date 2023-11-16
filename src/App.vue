<template>
  <div class="container">
    <div class="section">
      <h1 class="title is-flex is-align-content-center is-justify-content-center">
        <i class="material-icons mr-1">calendar_month</i>
        My Birthday Events
      </h1>
      <div class="columns">
        <div class="column">
          <div class="cal-col">
            <calendar :events="filtered_events" />
          </div>
        </div>
        <div class="column">
          <div>

          </div>
          <filter-input @filter="filter" />
          <!--<filter-by-date @filterEventsByDate="filterEventsByDate" />-->
          <div class="is-flex is-justify-content-space-between">
            <div class="mb-1">
              <sort-events-dropdown
                :events="events"
                @sortEvents="sortEvents"
                @setSortType="setSortType"
              />
              <sort-direction-dropdown
                v-show="sortType !== 'UPCOMING'"
                :events="events"
                @setSortDirection="setSortDirection"
                @sortEvents="sortEvents"
              />
            </div>
            <modal
              modal_id="add_event_modal"
              modal_name="add"
            >
              <add-event-form @fetchEvents="fetchEvents" />
            </modal>
          </div>
          <events-list :events="filtered_events" @fetchEvents="fetchEvents" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Modal from "./components/Modal.vue";
import AddEventForm from "./components/AddEventForm.vue";
import EventsList from "./components/EventsList.vue";
import Calendar from "./components/Calendar.vue";
import SortEventsDropdown from "./components/SortEventsDropdown.vue";
import SortDirectionDropdown from "./components/SortDirectionDropdown.vue";
import FilterInput from "./components/FilterInput.vue"
import FilterByDate from "./components/FilterByDate.vue"

export default {
  name: "App",
  components: {
    SortEventsDropdown,
    Calendar,
    EventsList,
    Modal,
    AddEventForm,
    SortDirectionDropdown,
    FilterInput,
    FilterByDate,
  },
  data() {
    return {
      events: [],
      filtered_events: [],
      sortDirection: "DESC",
      sortType: "UPCOMING",
    };
  },
  mounted() {
    this.fetchEvents();
  },
  methods: {
    fetchEvents() {
      fetch("http://localhost:4000/events", {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((events) => {
          this.events = events;
          this.filtered_events = events;
          this.sortEvents();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    isBirthdayUpcoming(eventDateString) {
      const eventDate = new Date(eventDateString);
      const currentDate = new Date();
      if (eventDate.getMonth() > currentDate.getMonth()) {
        return true;
      }
      if (
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getDate() >= currentDate.getDate()
      ) {
        return true;
      }
      return false;
    },
    sortEvents() {
      const now = new Date().getTime();

      if (this.sortType == "DATE" && this.sortDirection == "DESC") {
        this.events.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
      } else if (this.sortType == "DATE" && this.sortDirection == "ASC") {
        this.events.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      } else if (this.sortType == "NAME" && this.sortDirection == "ASC") {
        this.events.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      } else if (this.sortType == "NAME" && this.sortDirection == "DESC") {
        this.events.sort((a, b) => {
          return b.title.localeCompare(a.title);
        });
      } else if (this.sortType == "UPCOMING") {
        this.events.sort((a, b) => {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);

          const aUpcoming = this.isBirthdayUpcoming(a.date);
          const bUpcoming = this.isBirthdayUpcoming(b.date);

          // If both are upcoming or both are past, sort by their date
          if ((aUpcoming && bUpcoming) || (!aUpcoming && !bUpcoming)) {
            if (aDate.getMonth() === bDate.getMonth()) {
              return aDate.getDate() - bDate.getDate();
            }
            return aDate.getMonth() - bDate.getMonth();
          }

          // If one is upcoming and the other is past, the upcoming one should come first
          if (aUpcoming) {
            return -1;
          }
          if (bUpcoming) {
            return 1;
          }
        });
      }
    },

    setSortDirection(direction) {
      this.sortDirection = direction;
    },
    setSortType(type) {
      this.sortType = type;
    },
    filter(text) {
      if (text === "") {
        this.filtered_events = this.events;
        return;
      }
      this.filtered_events = this.events.filter((event) => {
        return event.title.toLowerCase().includes(text.toLowerCase());
      });
    },
    filterEventsByDate(startDate, endDate) {
      this.filteredEvents = this.events.filter((event) => {
        const eventDate = new Date(event.date);
        const start = startDate ? new Date(startDate) : new Date(-8640000000000000); // -Infinity
        const end = endDate ? new Date(endDate) : new Date(8640000000000000); // Infinity

        return eventDate >= start && eventDate <= end;
      });
    },

  },
};
</script>

<style>
.card-content .content {
  text-align: left;
}

.dropdown-item {
  cursor: pointer;
}

.cal-col {
  width: 100%;
  max-width: 26rem;
  margin: auto;
}

h1 .material-icons {
  font-size: 2.3rem;
}
</style>
