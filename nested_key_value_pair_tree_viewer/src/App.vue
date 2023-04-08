<template lang="pug">
.w-full.h-full.bg-yellow-400.py-4
  .max-w-screen-xl.mx-auto.mb-4(class="w-11/12")
    h1.text-4xl.font-bold.text-white {{ "Nested Key-Value Pair Tree Viewer" }}
  .max-w-screen-xl.mx-auto(class="h-5/6 w-11/12")
    .flex.gap-4.h-full
      .border.bg-white.p-8.border-slate-500.overflow-auto(class="w-2/4")
        .w-48.h-12.bg-teal-200.flex.items-center.justify-center.ml-auto.cursor-pointer.rounded-md.shadow-gray-200.border.border-slate-500(
          @click="addKeyValuePair",
          class="hover:shadow-lg"
        )
          span.text-xl {{ "+ Add New Pair" }}
        .flex.gap-4.mt-4(v-for="index in count", :key="index")
          .grow.h-10.bg-white
            input.bg-transparent.outline-none.border.text-slate-200.border-slate-500.text-xl.px-2.py-1.w-full.h-full.text-slate-800(
              type="text",
              placeholder="key",
              @input="(e) => inputData(e, index - 1, 'key')",
              :value="keyArr[index - 1]"
            )
          .grow.h-10.bg-white
            input.bg-transparent.outline-none.border.text-slate-200.border-slate-500.text-xl.px-2.py-1.w-full.h-full.text-slate-800(
              type="text",
              placeholder="Value",
              @input="(e) => inputData(e, index - 1, 'value')",
              :value="valueArr[index - 1]"
            )
          .w-10.h-10.bg-slate-800.flex.items-center.justify-center.cursor-pointer(
            @click="deleteKeyValuePair(index - 1)"
          )
            span.text-3xl.text-white -
      .border.bg-white.p-8.border-slate-500.overflow-auto(class="w-2/4")
        Menu(v-for="item in treeNode", :key="item.name", :item="item")
</template>

<script>
import Menu from "@/components/Menu.vue";
import { arrayToTree } from "@/utils/arrayToTree";
import { textSplit } from "@/utils/textSplit";
import { onMounted, ref } from "vue";

export default {
  components: { Menu },
  setup() {
    const count = ref(4);
    const keyArr = ref([
      "nav.header.creator",
      "nav.icon",
      "nav.header.product",
      "common.feature.experience",
    ]);
    const valueArr = ref([
      "3D Fabric Creator",
      "Icon name",
      "Product",
      "Try It Now!",
    ]);
    const keySplitText = ref([]);
    const treeNode = ref([]);

    const inputData = (e, index, param) => {
      const { value } = e.target;
      switch (param) {
        case "key":
          keyArr["value"][index] = value;
          keySplitText["value"] = textSplit(keyArr["value"]);
          break;
        case "value":
          valueArr["value"][index] = value;
          break;

        default:
          break;
      }
      treeNode["value"] = arrayToTree(keySplitText["value"], valueArr["value"]);
    };

    const addKeyValuePair = () => {
      count["value"] += 1;
      keyArr["value"].push("");
      valueArr["value"].push("");
    };

    const deleteKeyValuePair = (index) => {
      count["value"] -= 1;
      keyArr["value"].splice(index, 1);
      valueArr["value"].splice(index, 1);
      keySplitText["value"] = textSplit(keyArr["value"]);
      treeNode["value"] = arrayToTree(keySplitText["value"], valueArr["value"]);
    };

    onMounted(() => {
      keySplitText["value"] = textSplit(keyArr["value"]);
      treeNode["value"] = arrayToTree(keySplitText["value"], valueArr["value"]);
    });

    return {
      count,
      keyArr,
      valueArr,
      keySplitText,
      treeNode,
      inputData,
      addKeyValuePair,
      deleteKeyValuePair,
    };
  },
};
</script>

<style lang="sass">
body
  overflow: hidden
  overscroll-behavior: none

#app
  width: 100vw
  height: 100dvh
</style>