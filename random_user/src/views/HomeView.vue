<template lang="pug">
Header
#main-content.py-4.mx-auto.max-w-screen-xl(class="w-11/12")
  .flex.flex-col.h-full.gap-4
    .flex.justify-between.items-center
      Filter
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
import { computed } from "vue";
import { useStore } from "vuex";

import Header from "@/components/Header.vue";
import Dropdown from "@/components/Dropdown.vue";
import Switch from "@/components/Switch.vue";
import Modal from "@/components/Modal.vue";
import Pagination from "@/components/Pagination.vue";
import Card from "@/components/Card.vue";
import List from "@/components/List.vue";
import Filter from "@/components/Filter.vue";

export default {
  components: {
    Header,
    Dropdown,
    Switch,
    Card,
    Modal,
    Pagination,
    List,
    Filter,
  },
  setup() {
    const store = useStore();

    const isPopup = computed(() => store.state.isPopup);
    const displayMode = computed(() => store.state.displayMode);
    const filter = computed(() => store.state.filter);

    const setState = (key, value) => {
      store.commit("setState", { key, value });
    };

    const changeFilter = (param) => {
      setState("filter", param);
      setState("currentPage", 1);
    };

    return { isPopup, displayMode, filter, changeFilter };
  },
};
</script>

<style lang="sass" scoped>
#main-content
  height: calc( 100dvh - 64px )
</style>