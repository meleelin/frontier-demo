<template lang="pug">
template(v-if="currentPage !== 1")
  .w-8.h-8.bg-slate-200.flex.justify-center.items-center.cursor-pointer(
    @click="prevPage"
  )
    span {{ "<" }}
template(v-if="totalPage < 4")
  template(v-for="index in totalPage")
    .w-8.h-8.flex.justify-center.items-center.cursor-pointer(
      @click="changePage(index)",
      :class="currentPage === index ? ['bg-emerald-100'] : ['bg-slate-200']"
    )
      span {{ index }}
template(v-else-if="currentPage < 4")
  .w-8.h-8.flex.justify-center.items-center.cursor-pointer(
    @click="changePage(1)",
    :class="currentPage === 1 ? ['bg-emerald-100'] : ['bg-slate-200']"
  )
    span {{ "1" }}
  .w-8.h-8.flex.justify-center.items-center.cursor-pointer(
    @click="changePage(2)",
    :class="currentPage === 2 ? ['bg-emerald-100'] : ['bg-slate-200']"
  )
    span {{ "2" }}
  .w-8.h-8.flex.justify-center.items-center.cursor-pointer(
    @click="changePage(3)",
    :class="currentPage === 3 ? ['bg-emerald-100'] : ['bg-slate-200']"
  )
    span {{ "3" }}

  .w-8.h-8.flex.justify-center.items-center.cursor-pointer.bg-slate-200
    span {{ "..." }}
  .w-8.h-8.flex.justify-center.items-center.cursor-pointer.bg-slate-200(
    @click="changePage(totalPage)"
  )
    span {{ totalPage }}
template(v-else-if="totalPage - currentPage < 3")
  .w-8.h-8.flex.justify-center.items-center.cursor-pointer.bg-slate-200(
    @click="changePage(1)"
  )
    span {{ "1" }}
  .w-8.h-8.flex.justify-center.items-center.cursor-pointer.bg-slate-200
    span {{ "..." }}
  .w-8.h-8.flex.justify-center.items-center.cursor-pointer(
    @click="changePage(totalPage - 2)",
    :class="currentPage === totalPage - 2 ? ['bg-emerald-100'] : ['bg-slate-200']"
  )
    span {{ totalPage - 2 }}
  .w-8.h-8.flex.justify-center.items-center.cursor-pointer(
    @click="changePage(totalPage - 1)",
    :class="currentPage === totalPage - 1 ? ['bg-emerald-100'] : ['bg-slate-200']"
  )
    span {{ totalPage - 1 }}
  .w-8.h-8.flex.justify-center.items-center.cursor-pointer(
    @click="changePage(totalPage)",
    :class="currentPage === totalPage ? ['bg-emerald-100'] : ['bg-slate-200']"
  )
    span {{ totalPage }}
template(v-else)
  .w-8.h-8.flex.justify-center.items-center.cursor-pointer.bg-slate-200(
    @click="changePage(1)"
  )
    span {{ "1" }}
  .w-8.h-8.flex.justify-center.items-center.cursor-pointer.bg-slate-200
    span {{ "..." }}
  .w-8.h-8.flex.justify-center.items-center.cursor-pointer.bg-slate-200(
    @click="changePage(currentPage - 1)"
  )
    span {{ currentPage - 1 }}
  .w-8.h-8.flex.justify-center.items-center.cursor-pointer.bg-emerald-100(
    @click="changePage(currentPage)"
  )
    span {{ currentPage }}
  .w-8.h-8.flex.justify-center.items-center.cursor-pointer.bg-slate-200(
    @click="changePage(currentPage + 1)"
  )
    span {{ currentPage + 1 }}
  .w-8.h-8.flex.justify-center.items-center.cursor-pointer.bg-slate-200
    span {{ "..." }}
  .w-8.h-8.flex.justify-center.items-center.cursor-pointer.bg-slate-200(
    @click="changePage(totalPage)"
  )
    span {{ totalPage }}
template(v-if="currentPage !== totalPage")
  .w-8.h-8.bg-slate-200.flex.justify-center.items-center.cursor-pointer(
    @click="nextPage"
  )
    span {{ ">" }}
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const fetchData = computed(() => store.state.fetchData);
    const currentPage = computed(() => store.state.currentPage);
    const count = computed(() => store.state.count);
    const totalPage = computed(() => store.state.totalPage);
    const collected = computed(() => store.state.collected);
    const userData = computed(() => store.state.userData);
    const isPopup = computed(() => store.state.isPopup);

    const changePage = (index) => {
      store.commit("setState", { key: "currentPage", value: index });
    };

    const prevPage = () => {
      const prevPage = currentPage.value - 1;
      store.commit("setState", { key: "currentPage", value: prevPage });
    };

    const nextPage = () => {
      const nextPage = currentPage.value + 1;
      store.commit("setState", { key: "currentPage", value: nextPage });
    };
    return {
      fetchData,
      currentPage,
      count,
      totalPage,
      collected,
      userData,
      isPopup,
      changePage,
      prevPage,
      nextPage,
    };
  },
};
</script>