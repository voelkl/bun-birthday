<template>
  <ul id="eventsList">
    <li v-for="event in events">
      <div class="card mb-2">
        <header class="card-header p-2 is-3">
          <p class="card-header-title">
            {{ event.title }}
          </p>
          <modal
            :modal_id="`edit_event_modal-${event.id}`"
            modal_name="Edit Event"
          >
            <form
              ref="editEventForm"
              @submit.prevent="editEvent(event)"
              id="edit-birthday-form"
            >
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input
                    class="input"
                    v-model="event.title"
                    name="title"
                    type="text"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Details</label>
                <div class="control">
                  <input
                    class="input"
                    v-model="event.description"
                    name="description"
                    type="text"
                    id="birthday-description"
                  />
                </div>
              </div>
              <div class="field">
                <label class="label">Date</label>
                <div class="control">
                  <input
                    class="input"
                    v-model="event.date"
                    name="date"
                    type="date"
                    id="birthday-date"
                  />
                </div>
              </div>
              <input
                @click="editEvent"
                class="button"
                id="confirmBtn"
                type="submit"
                value="Submit"
              />
            </form>
          </modal>
          <modal
            :modal_id="`delete_event_modal-${event.id}`"
            modal_name="Delete Event"
          >
            <div>
              <p>Are you sure you want to delete this event?</p>
              <button class="button" @click="deleteEvent(event)">
                Yes, Delete it!
              </button>
            </div>
          </modal>
        </header>
        <div class="card-content">
          <div class="content">
            <p>Alter: {{ calculateAge(event.date) }}</p>
            <p id="birth-date-${event.id}">Date: {{ event.date }}</p>
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
  },
  name: "EventsList",
  props: {
    events: Array,
  },
  methods: {
    editEvent(event) {
      if (event.title && event.date) {
        fetch(`http://localhost:3000/events/${event.id}`, {
          method: "PUT",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: event.title,
            description: event.description,
            date: event.date,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              console.log("Event updated successfully");
              (document.querySelectorAll(".modal") || []).forEach((modal) => {
                modal.classList.remove("is-active");
              });
            }
          });
      }
    },
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
            (document.querySelectorAll(".modal") || []).forEach((modal) => {
              modal.classList.remove("is-active");
            });
            this.$emit("fetchEvents");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    calculateAge(birthdateString: string) {
      const birthdate = new Date(birthdateString);
      const today = new Date("2023-10-10");

      let age = today.getFullYear() - birthdate.getFullYear();
      const monthDifference = today.getMonth() - birthdate.getMonth();

      // If the birth month has not occurred this year yet, or if it's the birth month but the birth day has not yet occurred, subtract 1 from the age.
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthdate.getDate())
      ) {
        age--;
      }

      return age;
    },
  },
};
</script>