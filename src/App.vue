<template>
  <div class="container">
    <div class="section">
      <h1 class="title">
        <i class="material-icons">calendar_month</i>
        My Birthday Events
      </h1>
      <div class="columns">
        <div class="column">
          <modal modal_id="add_event_modal" modal_name="Add Birthday Event">
            <add-event-form
              @fetchEvents="fetchEvents"
            />
          </modal>
          <calendar
            :events="events"
          />
        </div>
        <div class="column">
          <sort-events-dropdown />
          <events-list
              :events="events"
              @fetchEvents="fetchEvents"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Modal from "./components/Modal.vue"
import AddEventForm from "./components/AddEventForm.vue"
import EventsList from "./components/EventsList.vue";
import Calendar from "./components/Calendar.vue";
import SortEventsDropdown from "./components/SortEventsDropdown.vue";

interface Window {
  jsCalendar: any;
  bunCalendar: any;
}

type BirthdayEvent = {
  id?: number;
  title: string;
  description: string;
  date: string;
};

export default {
  name: "App",
  components: {
    SortEventsDropdown,
    Calendar,
    EventsList,
    Modal,
    AddEventForm
  },
  data() {
    return {
      events: [] as Array
    }
  },
  mounted() {
    this.fetchEvents()
  },
  methods: {
    fetchEvents() {
      fetch("http://localhost:3000/events", {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
          .then((res) => res.json())
          .then((events) => {
            this.events = events
          })
          .catch((error) => {
            console.log(error)
          })
    },
  }

}
</script>

<style>
  .card-content .content {
    text-align: left;
  }
</style>
