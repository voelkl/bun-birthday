<template>
  <div>
    <button
      ref="modal-button"
      class="js-modal-trigger button is-primary is-outlined p-2"
      :data-target="this.modal_id"
      @click="openModal()"
    >
      <i v-if="modal_name == 'Edit Event'" class="material-icons">edit</i>
      <i v-else-if="modal_name == 'add'" class="material-icons">add</i>
      <i v-else-if="modal_name == 'Delete Event'" class="material-icons">delete</i>
      <i v-else class="material-icons">
        {{ this.modal_name }}
      </i>
      <span v-if="modal_name == 'add'">
        Add new Birthday
      </span>
    </button>
    <div ref="modal" :id="modal_id" class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            {{ this.modal_name }}
          </p>
          <button
            @click="closeModal()"
            class="delete"
            aria-label="close"
          ></button>
        </header>
        <section class="modal-card-body">
          <slot @fetchEvent="fetchEvents" />
        </section>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Modal",
  props: {
    modal_id: String,
    modal_name: String,
  },
  mounted() {
    // Add a keyboard event to close all modals
    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        this.closeModal();
      }
    });

    // Add a click event on various child elements to close the parent modal
    (
      document.querySelectorAll(
        ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
      ) || []
    ).forEach(($close) => {
      const $target = $close.closest(".modal");

      $close.addEventListener("click", () => {
        this.closeModal($target);
      });
    });
  },

  methods: {
    openModal() {
      this.$refs.modal?.classList.add("is-active");
    },
    closeModal() {
      this.$refs.modal?.classList.remove("is-active");
    },
    fetchEvents() {
      this.$emit("fetchEvents");
    },
  },
};
</script>
<style scoped lang="scss">
.button {
  margin-left: 5px;

  i {
   font-size: 18px;
  }
}
</style>

