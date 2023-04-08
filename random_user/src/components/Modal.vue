<template lang="pug">
.absolute.inset-0.w-full.h-full.flex.justify-center.items-center(
  class="bg-slate-800/75",
  @click="closePopup"
)
  .max-w-md.bg-white.relative.rounded-lg.p-6(class="w-11/12", @click.stop="")
    .flex.flex-col.gap-4
      .flex.justify-between.items-center
        h2.text-gray-700.text-xl {{ "User Infomation" }}
        svg.cursor-pointer(
          width="20",
          height="20",
          xmlns="http://www.w3.org/2000/svg",
          viewbox="0 -0.5 21 21",
          @click="closePopup"
        )
          path.w-full.h-full(
            fill="#374151",
            fill-rule="evenodd",
            d="M12.018 10 21 18.554 19.481 20 10.5 11.446 1.518 20 0 18.554 8.981 10 0 1.446 1.518 0 10.5 8.554 19.481 0 21 1.446z"
          )
      .overflow-hidden.rounded-lg(class="aspect-4/3")
        img.w-full.h-full.object-center.object-cover(
          :src="popupData.picture.large"
        )
      .flex.flex-col.gap-1
        p.text-4xl.text-gray-700.font-bold {{ popupData.name.title }} {{ popupData.name.first }} {{ popupData.name.last }}
        p.text-md.text-gray-500 {{ popupData.location.city }}, {{ popupData.location.country }}
        p.text-md.text-gray-500 {{ popupData.email }}
        p.text-md.text-gray-500 {{ popupData.phone }}
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const popupData = computed(() => store.state.popupData);

    function closePopup() {
      store.commit("setState", { key: "isPopup", value: false });
    }

    return { popupData, closePopup };
  },
};
</script>
<style>
</style>