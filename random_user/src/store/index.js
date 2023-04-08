import { createStore } from "vuex";

export default createStore({
  state: {
    displayMode: "card",
    currentPage: 1,
    totalPage: 11,
    filter: "all",
    count: 30,
    fetchData: [],

    // 使用者資料
    userData: null,

    collected: [],

    // 控制 popup
    isPopup: false,
    popupData: {},
  },
  mutations: {
    setState(state, payload) {
      const { key, value } = payload;
      state[key] = value;
    },
  },
  actions: {},
  modules: {},
});
