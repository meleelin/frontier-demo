<template lang="pug">
.flex.flex-col.gap-4.pr-2
  template(v-if="fetchData.length === 0")
    template(v-for="index in 10")
      .cursor-pointer.w-full.p-4.rounded-lg.border.border-slate-300.overflow-hidden.shadow-slate-200.shadow-lg.bg-white
        .flex.items-center.gap-3
          .w-20.h-20.rounded-lg.overflow-hidden.loading
          .flex.flex-col.grow.gap-2
            span.loading
            span.loading
  template(v-else)
    template(v-for="(item, index) in pageFetchData", :key="index")
      .cursor-pointer.w-full.p-4.rounded-lg.border.border-slate-300.overflow-hidden.shadow-slate-200.shadow-lg.bg-white(
        class="hover:shadow-slate-300",
        @click="openPopup(item)"
      )
        .flex.items-center.gap-3
          .w-20.h-20.rounded-lg.overflow-hidden
            img.object-cover.object-center.w-full.h-full(
              :src="item.picture.large"
            )
          .flex.flex-col.grow
            span {{ item.name.first }} {{ item.name.last }}
            span.text-xs.text-gray-500(class="md:text-md") {{ item.location.city }}, {{ item.location.country }}
          svg.cursor-pointer(
            @click.stop="toggleCollected(item)",
            xmlns="http://www.w3.org/2000/svg",
            width="24",
            height="24",
            fill="none",
            viewBox="0 0 24 24"
          )
            path(
              stroke="#000",
              :fill="isCollected(item) ? 'red' : ''",
              stroke-linecap="round",
              stroke-linejoin="round",
              stroke-width="2",
              d="M12 7.694C10 3 3 3.5 3 9.5s9 11 9 11 9-5 9-11-7-6.5-9-1.806Z"
            )
</template>

<script>
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";
import "firebase/compat/firestore";
import firebase from "@/utils/firebase";
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const fetchData = computed(() => store.state.fetchData);
    const currentPage = computed(() => store.state.currentPage);
    const count = computed(() => store.state.count);
    const collected = computed(() => store.state.collected);
    const userData = computed(() => store.state.userData);
    const filter = computed(() => store.state.filter);

    const pageFetchData = computed(() => {
      const begin = (currentPage.value - 1) * count.value;
      const end = currentPage.value * count.value;
      let slice;
      let totalPage;
      switch (filter.value) {
        case "all":
          slice = fetchData.value.slice(begin, end);
          totalPage = Math.ceil(301 / count.value);
          break;
        case "favorite":
          const collectedArr = fetchData.value.filter((item) => {
            const res = collected.value.indexOf(item.login.uuid);
            if (res !== -1) return item;
          });

          slice = collectedArr.slice(begin, end);
          totalPage = Math.ceil(collected.value.length / count.value);
          break;

        default:
          break;
      }
      store.commit("setState", { key: "totalPage", value: totalPage });
      return slice;
    });

    const toggleCollected = async (item) => {
      const { uuid } = item.login;
      if (userData.value) {
        const { uid } = userData.value;

        const docRef = await firebase
          .firestore()
          .collection("collected")
          .doc(uid);

        const res = await docRef.get();
        if (!res.data()) {
          docRef.set({ collected: [uuid] });
        } else {
          if (collected.value.includes(uuid)) {
            docRef.update({
              collected: firebase.firestore.FieldValue.arrayRemove(uuid),
            });
          } else {
            docRef.update({
              collected: firebase.firestore.FieldValue.arrayUnion(uuid),
            });
          }
        }
      } else {
        router.push({ path: "/login" });
      }
    };

    const openPopup = (item) => {
      store.commit("setState", { key: "isPopup", value: true });
      store.commit("setState", { key: "popupData", value: item });
    };

    const isCollected = (item) => {
      const { uuid } = item.login;
      return collected.value.includes(uuid);
    };
    return {
      pageFetchData,
      fetchData,
      toggleCollected,
      openPopup,
      isCollected,
    };
  },
};
</script>
<style lang="sass" scoped>
.loading
  background-color: rgb(209 213 219)
  max-width: 100px
  min-height: 20px
  position: relative
  overflow: hidden

  &::before
    content: ""
    position: absolute
    display: block
    width: 100%
    height: 100%
    background: linear-gradient(to right, transparent, rgb(249 250 251) , transparent)
    transform: translate(-100%)
    animation: loading 1s infinite

@keyframes loading
  100%
    transform: translateX(100%)
</style>
