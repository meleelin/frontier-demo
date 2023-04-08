<template lang="pug">
div
  .flex.items-center.gap-2
    p.text-2xl {{ item.name === "" ? "" : `${item.name} :` }}
    template(v-if="item.children")
      span.text-slate-600.text-xl.cursor-pointer(
        @click.prevent="isOpen = !isOpen"
      ) {{ isOpen ? "[-]" : "[+]" }}
    template(v-else="item.value")
      span.text-slate-600.text-xl {{ item.value }}
  template(v-if="item.children")
    Menu.ml-7(
      v-for="item in item.children",
      v-show="isOpen",
      :key="item.name",
      :item="item"
    )
</template>

<script>
import { ref } from "vue";

export default {
  name: "Menu",
  props: {
    item: {
      type: Object,
    },
  },
  setup(props) {
    const isOpen = ref(true);
    return { props, isOpen };
  },
};
</script>

