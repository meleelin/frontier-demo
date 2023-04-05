<template lang="pug">
.w-full.h-16.bg-white.shadow-md.shrink-0
  .mx-auto.h-full.max-w-screen-xl(class="w-11/12")
    .flex.justify-between.items-center.h-full 
      |
      |
      RouterLink.cursor-pointer(to="/") Random User
      span {{ filter }}
      template(v-if="userData")
        .px-4.border-2.border-slate-600.rounded-full.cursor-pointer(
          @click="logOut"
        ) 登出
      template(v-else)
        RouterLink.px-4.border-2.border-slate-600.rounded-full(to="/login") 登入/註冊
</template>

<script>
import { mapState } from "vuex";
import { RouterLink } from "vue-router";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebase from "../utils/firebase";
export default {
  computed: {
    ...mapState({
      userData: (state) => state.userData,
      currentPage: (state) => state.currentPage,
      count: (state) => state.count,
      filter: (state) => state.filter,
    }),
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // 登出後強制重整一次頁面
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  },
};
</script>

