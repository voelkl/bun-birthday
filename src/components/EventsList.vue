<template>
  <ul id="eventsList">
    <li v-for="event in events">
      <div class="card mb-2">
        <header class="card-header">
          <p class="card-header-title">
            {{ event.title }}
          </p>
          <modal
            modal_id="edit_event_modal"
            modal_name="Edit Event"
          >
            <edit-event-form
              :event_props="event"
            />
          </modal>
          <modal
              modal_id="delete_event_modal"
              modal_name="Delete Event"
          >
            <div>
              <p>
                Are you sure you want to delete this event?
              </p>
              <button class="button" @click="deleteEvent(event)">Yes, Delete it!</button>
            </div>
          </modal>
        </header>
        <div class="card-content">
          <div class="content">
            <p>Alter: {{ getAge(event.date) }}</p>
            <p id="birth-date-${event.id}">
              Date: {{ event.date }}
            </p>
            <p id="birthday-ideas-${event.id}">
              Details: {{ event.description }}
            </p>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script lang="ts">
import EditEventForm from "./EditEventForm.vue";
import Modal from "./Modal.vue";

type BirthdayEvent = {
  id?: number;
  title: string;
  description: string;
  date: string;
};
export default {
  components: {
    Modal,
    EditEventForm
  },
  name: "EventsList",
  props: {
    events: Array,
  },
  methods: {
    deleteEvent(event) {
      fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              (document.querySelectorAll('.modal') || []).forEach((modal) => {
                modal.classList.remove("is-active");
              });
              this.$emit('fetchEvents')
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
    getAge(date) {
      let dateNow = new Date()
      let dateBefore = new Date(date)
      return dateNow.getYear() - dateBefore.getYear()
    }
  }
}
</script>