<template lang="pug">
.flex.flex-col.gap-2
  template(v-for="(item, index) in pageFetchData", :key="index")
    .w-full.p-4.bg-slate-100
      .flex.items-center.gap-3
        .w-20.h-20
          img.object-cover.object-center.w-full.h-full(
            :src="item.picture.large",
            alt=""
          )
        .flex.flex-col.grow
          span {{ item.name.first }} {{ item.name.last }}
          span {{ item.location.city }}, {{ item.location.country }}
        svg.cursor-pointer(
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

export default {
  computed: {
    ...mapState({
      fetchData: (state) => state.fetchData,
      currentPage: (state) => state.currentPage,
      count: (state) => state.count,
      collected: (state) => state.collected,
      userData: (state) => state.userData,
      filter: (state) => state.userData,
    }),
    pageFetchData() {
      return this.fetchData.slice(
        (this.currentPage - 1) * this.count,
        this.currentPage * this.count
      );
    },
  },
  methods: {
    isCollected(item) {
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