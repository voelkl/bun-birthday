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
        <div class="dropdown-item" @click="handleDropdownClick('DATE')">
          Sort by Date
        </div>
        <div class="dropdown-item" @click="handleDropdownClick('NAME')">
          Sort by Name
        </div>
        <div class="dropdown-item" @click="handleDropdownClick('UPCOMING')">
          Sort by Upcoming
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SortEventDropdown",
  props: {
    events: Array,
  },
  data() {
    return {
      is_active: false,
      selected_dropdown_item: "Sort by Upcoming",
    };
  },
  methods: {
    handleDropdownClick(item) {
      if (item === "DATE") {
        this.selected_dropdown_item = "Sort by Date";
        this.$emit("setSortType", item);
        this.$emit("sortEvents");
      } else if (item === "NAME") {
        this.selected_dropdown_item = "Sort by Name";
        this.$emit("setSortType", item);
        this.$emit("sortEvents");
      } else if (item === "UPCOMING") {
        this.selected_dropdown_item = "Sort by Upcoming";
        this.$emit("setSortType", item);
        this.$emit("sortEvents");
      }
    },
  },
};
</script>