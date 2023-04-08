<template lang="pug">
.flex.gap-2
  span.underline.cursor-pointer(
    :class="filter === 'all' ? 'text-indigo-600' : 'text-indigo-300'",
    @click="changeFilter('all')"
  ) {{ "ALL" }}
  span.underline.cursor-pointer(
    :class="filter === 'favorite' ? 'text-indigo-600' : 'text-indigo-300'",
    @click="changeFilter('favorite')"
  ) {{ "Favorite" }}
</template>
<script>
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const filter = computed(() => store.state.filter);
    const userData = computed(() => store.state.userData);

    const changeFilter = (param) => {
      if (param === "favorite" && !userData.value) {
        router.push({ path: "/login" });
        return;
      }
      store.commit("setState", { key: "filter", value: param });
      store.commit("setState", { key: "currentPage", value: 1 });
    };

    return { filter, userData, changeFilter };
  },
};
</script>

