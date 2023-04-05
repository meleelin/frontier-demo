<template lang="pug">
Header
#main-content.py-4.mx-auto.max-w-screen-xl(class="w-11/12")
  .flex.flex-col.h-full.gap-4
    .flex.justify-between.items-center
      .flex.gap-2
        span.underline.cursor-pointer(
          :class="filter === 'all' ? 'text-indigo-600' : 'text-indigo-300'",
          @click="changeFilter('all')"
        ) {{ "ALL" }}
        span.underline.cursor-pointer(
          :class="filter === 'favorite' ? 'text-indigo-600' : 'text-indigo-300'",
          @click="changeFilter('favorite')"
        ) {{ "Favorite" }}
      .flex.gap-2.items-center
        Dropdown
        Switch
    .grow.overflow-y-auto
      template(v-if="displayMode === 'card'")
        Card
      template(v-else-if="displayMode === 'list'")
        List
    .flex.justify-center.items-center.gap-2
      Pagination

Modal(v-if="isPopup")
</template>

<script>
import Header from "@/components/Header.vue";
import Dropdown from "@/components/Dropdown.vue";
import Switch from "@/components/Switch.vue";
import Modal from "@/components/Modal.vue";
import Pagination from "@/components/Pagination.vue";
import Card from "@/components/Card.vue";
import List from "@/components/List.vue";

import { mapState, mapMutations } from "vuex";

export default {
  components: {
    Header,
    Dropdown,
    Switch,
    Card,
    Modal,
    Pagination,
    List,
  },
  computed: {
    ...mapState({
      isPopup: (state) => state.isPopup,
      displayMode: (state) => state.displayMode,
      filter: (state) => state.filter,
    }),
  },
  methods: {
    ...mapMutations({
      setState: "setState",
    }),
    changeFilter(param) {
      this.setState({ key: "filter", value: param });
    },
  },
};
</script>

<style lang="sass" scoped>
#main-content
  height: calc( 100dvh - 64px )
</style>