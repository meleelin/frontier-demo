<template lang="pug">
.flex.gap-2
  .w-10.h-10.border-2.rounded-md.cursor-pointer.flex.items-center.justify-center(
    @click="changeMode('card')",
    :class="displayMode === 'card' ? 'bg-gray-200' : ''"
  )
    svg.w-8.h-8(xmlns="http://www.w3.org/2000/svg", viewBox="0 0 32 32")
      path(d="M8 15h7V8H8v7zm9-7v7h7V8h-7zm0 16h7v-7h-7v7zm-9 0h7v-7H8v7z")
  .w-10.h-10.border-2.rounded-md.cursor-pointer.flex.items-center.justify-center(
    @click="changeMode('list')",
    :class="displayMode === 'list' ? 'bg-gray-200' : ''"
  )
    svg.w-6.h-6(
      xmlns="http://www.w3.org/2000/svg",
      fill="none",
      viewbox="0 0 24 24"
    )
      path(
        stroke="#000",
        stroke-linecap="round",
        stroke-linejoin="round",
        stroke-width="1.5",
        d="M7 8h10M7 12h10M7 16h6M4 4h16v16H4V4Z"
      )
</template>


<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const displayMode = computed(() => store.state.displayMode);
    const changeMode = (param) => {
      store.commit("setState", { key: "displayMode", value: param });
      store.commit("setState", { key: "currentPage", value: 1 });
    };
    return { displayMode, changeMode };
  },
};
</script>

