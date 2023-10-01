<template>
  <div>
    <form
        ref="editEventForm"
        @submit.prevent="editEvent(event)"
        id="edit-birthday-form"
    >
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" v-model="event.title" name="title" type="text"/>
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
          <input class="input" v-model="event.date" name="date" type="date" id="birthday-date"/>
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
  </div>
</template>

<script>
export default {
  name: "EditEventForm",
  props: {
    event_props: Object
  },
  data: () => ({
    event: {}
  }),

  mounted() {
    this.event = this.event_props
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
            date: event.date
          }),
        })
            .then((res) => res.json())
            .then((res) => {
              if (res.success) {
                console.log("Event updated successfully");
                (document.querySelectorAll('.modal') || []).forEach((modal) => {
                  modal.classList.remove("is-active");
                });
              }
            });
      }
    },
  },
};
</script>
