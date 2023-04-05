<template lang="pug">
.grid.grid-cols-2.gap-2.shrink-0(class="sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5")
  template(v-for="(item, index) in pageFetchData", :key="index")
    .cursor-pointer.rounded-lg.border.border-slate-300.overflow-hidden.shadow-slate-200.shadow-lg(
      class="aspect-[3/4] hover:shadow-slate-400"
    )
      .w-full.overflow-hidden(class="h-1/2")
        img.object-cover.object-center.w-full.h-full(
          :src="item.picture.large",
          alt=""
        )
      .flex.flex-col.justify-between.p-2(class="h-1/2")
        p
          span.text-sm.font-bold(class="md:text-lg") {{ item.name.first }} {{ item.name.last }}
          br
          span.text-sm(class="md:text-md") {{ item.location.city }}, {{ item.location.country }}
        svg.ml-auto.cursor-pointer(
          @click="toggleCollected(item)",
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
import { mapState, mapMutations } from "vuex";
import "firebase/compat/firestore";
import firebase from "../utils/firebase";
export default {
  computed: {
    ...mapState({
      fetchData: (state) => state.fetchData,
      currentPage: (state) => state.currentPage,
      count: (state) => state.count,
      totalPage: (state) => state.totalPage,
      collected: (state) => state.collected,
      userData: (state) => state.userData,
      filter: (state) => state.filter,
    }),
    pageFetchData() {
      if (this.filter === "all") {
        const begin = (this.currentPage - 1) * this.count;
        const end = this.currentPage * this.count;
        const sliceArr = this.fetchData.slice(begin, end);
        return sliceArr;
      } else {
        const collectedArr = this.fetchData.filter((item) => {
          const res = this.collected.indexOf(item.login.uuid);
          if (res !== -1) return item;
        });
        return collectedArr;
      }
    },
  },
  methods: {
    ...mapMutations({
      setState: "setState",
    }),
    openPopup() {
      this.setState({ key: "isPopup", value: true });
    },
    isCollected(item) {
      // return false;
      const { uuid } = item.login;
      return this.collected.includes(uuid);
    },
    async toggleCollected(item) {
      const { uuid } = item.login;
      if (!this.userData) {
        this.$router.push({ path: "/login" });
      } else {
        const documentRef = firebase
          .firestore()
          .collection("collected")
          .doc(this.userData.uid);
        if (this.collected.includes(uuid)) {
          documentRef.update({
            collected: firebase.firestore.FieldValue.arrayRemove(uuid),
          });
        } else {
          documentRef.update({
            collected: firebase.firestore.FieldValue.arrayUnion(uuid),
          });
        }
      }
    },
  },
};
</script>

<style>
</style>