<template lang="pug">
.w-full.h-full.flex.flex-col
  router-view
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import firebase from "./utils/firebase";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default {
  computed: {
    ...mapState({
      displayMode: (state) => state.displayMode,
      currentPage: (state) => state.currentPage,
      totalPage: (state) => state.totalPage,
      count: (state) => state.count,
      filter: (state) => state.filter,
      userData: (state) => state.userData,
    }),
  },
  methods: {
    ...mapMutations({
      setState: "setState",
    }),
  },
  async created() {
    // 顯示模式
    const displayMode = localStorage.getItem("displayMode") || "card";
    this.setState({ key: "displayMode", value: displayMode });

    // 目前分頁
    const currentPage = localStorage.getItem("currentPage") || 1;
    this.setState({ key: "currentPage", value: parseInt(currentPage, 10) });

    // 總共幾筆
    const totalPage = localStorage.getItem("totalPage") || 11;
    this.setState({ key: "totalPage", value: parseInt(totalPage, 10) });

    // 每頁幾筆
    const count = localStorage.getItem("count") || 30;
    this.setState({ key: "count", value: parseInt(count, 10) });

    // 收藏或全部
    const filter = localStorage.getItem("filter") || "all";
    this.setState({ key: "filter", value: filter });

    // 取得 firebase userInfo

    firebase.auth().onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const { email, uid } = currentUser;
        console.log(email, uid);
        this.setState({ key: "userData", value: { email, uid } });
        const documentRef = firebase
          .firestore()
          .collection("collected")
          .doc(uid);
        // 會自動更新
        documentRef.onSnapshot((docSnapshot) => {
          const data = docSnapshot.data();
          console.log("data", data);
          this.setState({ key: "collected", value: data.collected });
        });
        // const snapShot = await documentRef.get();
        // console.log("snapShot", snapShot.data());
        // if (!snapShot.data()) {
        //   documentRef.set({ collected: [] });
        // } else {
        //   this.setState({ key: "collected", value: snapShot.data().collected });
        // }
      }
    });

    // 得到 random user data
    try {
      const res = await axios.get(
        `https://randomuser.me/api/?&results=301&seed=fe4f7e762a6ecd08`
      );
      const { results } = res.data;
      console.log("random_user", results);

      // 把 random user 存到 store
      this.setState({ key: "fetchData", value: results });
    } catch (error) {
      alert("unknown error");
    }

    window.addEventListener("beforeunload", () => {
      localStorage.setItem("displayMode", this.displayMode);
      localStorage.setItem("currentPage", this.currentPage);
      localStorage.setItem("totalPage", this.totalPage);
      localStorage.setItem("count", this.count);
      localStorage.setItem("filter", this.filter);
    });
    // setTimeout(() => {
    //   firebase
    //     .firestore()
    //     .collection("favorite")
    //     .get()
    //     .then((collectionSnapShot) => {
    //       const data = collectionSnapShot.docs.map((doc) => {
    //         return doc.data();
    //       });
    //       console.log("data", data);
    //     });
    // }, 3000);
  },
};
</script>


<style lang="sass">
:root
  --primary: rgba(162, 162, 162, 0.496)
  --secondary: rgb(150, 150, 150)

body
  overflow: hidden
#app
  width: 100vw
  height: 100dvh
  overflow: hidden
// #wrapper
//   width: 100%
//   height: 100%
</style>
