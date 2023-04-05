<template lang="pug">
template(v-if="currentPage !== 1")
  .w-8.h-8.bg-slate-100(@click="prevPage")
    span {{ "<" }}
template(v-for="index in totalPage")
  .w-8.h-8(
    @click="changePage(index)",
    :class="currentPage === index ? ['bg-orange-100'] : ['bg-red-200']"
  )
    span {{ index }}
template(v-if="currentPage !== totalPage")
.w-8.h-8.bg-slate-100(@click="nextPage")
  span {{ ">" }}
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      fetchData: (state) => state.fetchData,
      currentPage: (state) => state.currentPage,
      count: (state) => state.count,
      totalPage: (state) => state.totalPage,
      collected: (state) => state.collected,
      userData: (state) => state.userData,
      isPopup: (state) => state.isPopup,
    }),
  },
  methods: {
    ...mapMutations({
      setState: "setState",
    }),
    changePage(index) {
      this.setState({ key: "currentPage", value: index });
    },
    prevPage() {
      const prevPage = this.currentPage - 1;
      this.setState({ key: "currentPage", value: prevPage });
    },
    nextPage() {
      const nextPage = this.currentPage + 1;
      this.setState({ key: "currentPage", value: nextPage });
    },
  },
};
</script>

<style>
</style>