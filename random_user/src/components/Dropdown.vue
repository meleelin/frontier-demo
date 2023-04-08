<template lang="pug">
#custom_dropdown
  select.rounded-md.border-2.w-16.h-8(@change="changeCount")
    option(
      v-for="option in options",
      :key="option.value",
      :value="option.value",
      :selected="count === option.value"
    ) {{ option.label }}
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const count = computed(() => store.state.count);
    const currentPage = computed(() => store.state.currentPage);
    const filter = computed(() => store.state.filter);
    const collected = computed(() => store.state.collected);

    const options = [
      { label: "10", value: 10 },
      { label: "30", value: 30 },
      { label: "50", value: 50 },
    ];

    const changeCount = (e) => {
      const { value } = e.target;
      const countValue = parseInt(value, 10);

      // 重新計算有多少頁
      let totalPage;
      if (filter.value === "all") {
        totalPage = Math.ceil(3010 / countValue);
      } else {
        totalPage = Math.ceil(collected.value.length / countValue);
      }
      store.commit("setState", { key: "totalPage", value: totalPage });
      if (currentPage.value > totalPage) {
        store.commit("setState", { key: "currentPage", value: totalPage });
      }
      store.commit("setState", { key: "count", value: countValue });
    };

    return { count, options, changeCount };
  },
};
</script>