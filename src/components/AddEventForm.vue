<template>
  <div>
    <form
      ref="addEventForm"
      @submit.prevent="addNewEvent(form)"
      id="add-birthday-form"
    >
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input
            class="input"
            v-model="form.title"
            name="title"
            type="text"
            id="birthday-name"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Details</label>
        <div class="control">
          <input
            class="input"
            v-model="form.description"
            name="description"
            type="text"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Date</label>
        <div class="control">
          <input class="input" v-model="form.date" name="date" type="date" />
        </div>
      </div>
      <input @click="addNewEvent" class="button" type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
export default {
  name: "AddEventForm",
  emits: ["fetchEvents"],
  data: () => ({
    form: {
      title: "",
      description: "",
      date: "",
    },
  }),
  methods: {
    addNewEvent(event) {
      if (event.title && event.date) {
        fetch(`${process.env.VUE_APP_API_URL}/events`, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.BEARER_TOKEN}`,
          },
          body: JSON.stringify(event),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              console.log("Event added successfully");
              (document.querySelectorAll(".modal") || []).forEach((modal) => {
                modal.classList.remove("is-active");
              });
              this.form.title = "";
              this.form.description = "";
              this.form.date = "";
              this.$emit("fetchEvents");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
