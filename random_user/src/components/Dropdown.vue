<template lang="pug">
#custom_dropdown
  select.rounded-md.border-2(@change="handleChange")
    option(value=10, :selected="count === 10") {{ "10" }}
    option(value=30, :selected="count === 30") {{ "30" }}
    option(value=50, :selected="count === 50") {{ "50" }}
span {{ count }}
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      count: (state) => state.count,
      currentPage: (state) => state.page,
    }),
  },
  methods: {
    ...mapMutations({
      setState: "setState",
    }),
    handleChange(e) {
      const { value } = e.target;
      const count = parseInt(value, 10);

      // 重新計算有幾個分頁
      const totalPage = Math.ceil(301 / count);
      this.setState({ key: "currentPage", value: totalPage });
      this.setState({ key: "totalPage", value: totalPage });
      this.setState({ key: "count", value: count });
    },
  },
};
</script>

<style lang="sass" scoped>
#custom_dropdown select
  width: 60px
  height: 30px
</style>