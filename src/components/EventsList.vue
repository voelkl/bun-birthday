<template>
  <ul id="eventsList">
    <li
      v-for="event in events"
      :key="event.id"
    >
      <div class="card mb-2">
        <header class="card-header p-2 is-3">
          <p class="card-header-title">
            {{ event.title }}
          <span class="tag ml-2">
            {{ calculateAge(event.date) }}
          </span>
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
            <p id="birth-date-${event.id}">{{ new Date(event.date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
            <p>Hat in {{ calculateDaysLeft(event.date) }} Tagen Geburtstag</p>
            <div class="is-flex is-align-content-center">
              <i class="material-icons mr-1">redeem</i>
              <div>
                {{ event.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
import Modal from "./Modal.vue";
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
        fetch(`http://localhost:4000/events/${event.id}`, {
          method: "PUT",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Authorization": "Bearer 7GX43WAWJAKXZS8DSETPA8HN5G6VQ5LKP54SCPBN"
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
      fetch(`http://localhost:4000/events/${event.id}`, {
        method: "DELETE",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
          "Authorization": "Bearer 7GX43WAWJAKXZS8DSETPA8HN5G6VQ5LKP54SCPBN"
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
    calculateAge(birthdateString) {
      const birthdate = new Date(birthdateString);
      const today = new Date();

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
    calculateDaysLeft(birthday) {
      const today = new Date();
      const birthDate = new Date(birthday);
      const currentYear = today.getFullYear();
      const birthMonth = birthDate.getMonth();
      const birthDay = birthDate.getDate();
      const nextBirthday = new Date(currentYear, birthMonth, birthDay);
      if (nextBirthday < today) {
        nextBirthday.setFullYear(currentYear + 1);
      }
      const timeDiff = nextBirthday.getTime() - today.getTime();
      const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return daysLeft;
    }
  },
};
</script>
<style scoped>
#eventsList {
  padding: 6px;
  overflow: auto;
  height: 66vh;
}
</style>