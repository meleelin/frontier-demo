<template lang="pug">
.w-full.h-full.flex.flex-col
  #bg_wrapper
    .bg-1
    .bg-2
  router-view
</template>



<script>
import { computed, ref } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import firebase from "./utils/firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default {
  setup() {
    const store = useStore();
    const displayMode = computed(() => store.state.displayMode);
    const currentPage = computed(() => store.state.currentPage);
    const totalPage = computed(() => store.state.totalPage);
    const count = computed(() => store.state.count);
    const filter = computed(() => store.state.filter);
    // const userData = computed(() => store.state.userData);

    // 顯示模式
    const displayModeRef = ref(localStorage.getItem("displayMode") || "card");
    // 目前分頁
    const currentPageRef = ref(
      parseInt(localStorage.getItem("currentPage"), 10) || 1
    );
    // 總共幾筆
    const totalPageRef = ref(
      parseInt(localStorage.getItem("totalPage"), 10) || 11
    );
    // 每頁幾筆
    const countRef = ref(parseInt(localStorage.getItem("count"), 10) || 30);
    // 全部或收藏
    const filterRef = ref(localStorage.getItem("filter") || "all");

    // 存到 vuex

    store.commit("setState", {
      key: "displayMode",
      value: displayModeRef.value,
    });
    store.commit("setState", {
      key: "currentPage",
      value: currentPageRef.value,
    });
    store.commit("setState", { key: "totalPage", value: totalPageRef.value });
    store.commit("setState", { key: "count", value: countRef.value });
    store.commit("setState", { key: "filter", value: filterRef.value });

    // get firebase user info
    const getUserInfo = () => {
      firebase.auth().onAuthStateChanged((currentUser) => {
        if (currentUser) {
          const { email, uid } = currentUser;
          // 存到 store
          store.commit("setState", { key: "userData", value: { email, uid } });

          // 取得該會員的收藏紀錄
          const docRef = firebase.firestore().collection("collected").doc(uid);

          // 監聽變動
          docRef.onSnapshot((docSnapshot) => {
            const data = docSnapshot.data();
            console.log("data", data);

            if (data) {
              // 存到 store
              store.commit("setState", {
                key: "collected",
                value: data.collected,
              });
            }
          });
        }
      });
    };
    // get random user data
    const getRandomUserData = async () => {
      try {
        const prefix = "https://randomuser.me/api";
        const total = 301;
        const seed = "fe4f7e762a6ecd08";
        const res = await axios.get(`${prefix}?&results=${total}&seed=${seed}`);
        if (res.status === 200) {
          const { results } = res.data;
          store.commit("setState", { key: "fetchData", value: results });
        } else {
          alert("status not 200");
        }
      } catch (error) {
        alert("unknown error");
      }
    };

    const onBeforeUnload = () => {
      localStorage.setItem("displayMode", displayMode.value);
      localStorage.setItem("currentPage", currentPage.value);
      localStorage.setItem("totalPage", totalPage.value);
      localStorage.setItem("count", count.value);
      localStorage.setItem("filter", filter.value);
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    getUserInfo();
    getRandomUserData();

    return {};
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
  overflow: hidden

#bg_wrapper
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  width: 100%
  height: 100%
  z-index: -1
  filter: blur(5px)

.bg-1
  position: absolute
  top: 64px
  left: 0
  transform: translate(-50%,-50%)
  width: 35vw
  height: 35vw
  border-radius: 999px
  background-color: rgb(252 211 77)
  filter: blur(5px)
.bg-2
  position: absolute
  right: 0
  bottom: 0
  transform: translate(50%,50%)
  width: 35vw
  height: 35vw
  border-radius: 999px
  background-color: rgb(252 211 77)
  filter: blur(5px)
</style>
