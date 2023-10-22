<template>
  <div
    class="dropdown"
    :class="{ 'is-active': is_active }"
    @click="is_active = !is_active"
  >
    <div class="dropdown-trigger">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
        <span>{{ selected_dropdown_item }}</span>
        <i class="material-icons"> arrow_drop_down </i>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <div class="dropdown-item" @click="handleDropdownClick('ASC')">ASC</div>
        <div class="dropdown-item" @click="handleDropdownClick('DESC')">
          DESC
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SortDirectionDropdown",
  props: {
    events: Array,
  },
  data() {
    return {
      is_active: false,
      selected_dropdown_item: "DESC",
    };
  },
  methods: {
    handleDropdownClick(direction) {
      if (direction) {
        this.selected_dropdown_item = direction;
        this.$emit("setSortDirection", direction);
        this.$emit("sortEvents");
      }
    },
  },
};
</script>