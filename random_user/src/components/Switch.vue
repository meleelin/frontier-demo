<template lang="pug">
.flex.gap-2
  .w-4.h-4.bg-rose-200.cursor-pointer(@click="changeMode('card')")
  .w-4.h-4.bg-zinc-200.cursor-pointer(@click="changeMode('list')")
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations({
      setState: "setState",
    }),
    changeMode(param) {
      this.setState({ key: "displayMode", value: param });
      this.setState({ key: "currentPage", value: 1 });
    },
  },
};
</script>

<style>
</style>