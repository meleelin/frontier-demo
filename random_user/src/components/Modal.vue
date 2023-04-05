<template lang="pug">
.absolute.inset-0.w-full.h-full.flex.justify-center.items-center(
  class="bg-fuchsia-600/75"
)
  .max-w-7xl.bg-slate-100.relative(class="w-11/12 h-5/6")
    .absolute.top-1.right-1.cursor-pointer(@click="closePopup")
      svg.w-full.h-full(
        width="20",
        height="20",
        xmlns="http://www.w3.org/2000/svg",
        viewbox="0 -0.5 21 21"
      )
        path.w-full.h-full(
          fill="#000",
          fill-rule="evenodd",
          d="M12.018 10 21 18.554 19.481 20 10.5 11.446 1.518 20 0 18.554 8.981 10 0 1.446 1.518 0 10.5 8.554 19.481 0 21 1.446z"
        )
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: [],
  methods: {
    ...mapMutations({ setState: "setState" }),
    closePopup(e) {
      this.setState({ key: "isPopup", value: false });
    },
  },
};
</script>

<style>
</style>