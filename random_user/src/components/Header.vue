<template lang="pug">
.w-full.h-16.bg-white.shadow-md.shrink-0
  .mx-auto.h-full.max-w-screen-xl(class="w-11/12")
    .flex.justify-between.items-center.h-full 
      |
      |
      |
      RouterLink.text-xl.font-bold(to="/") {{ "Random User" }}
      template(v-if="userData")
        .px-4.border-2.border-slate-600.rounded-full.cursor-pointer.shadow-slate-200(
          class="hover:shadow-lg",
          @click="logout"
        ) {{ "登出" }}
      template(v-else)
        RouterLink.px-4.border-2.border-slate-600.rounded-full.shadow-slate-200(
          class="hover:shadow-lg",
          to="/login"
        ) {{ "登入 / 註冊" }}
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { RouterLink } from "vue-router";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebase from "@/utils/firebase";

export default {
  components: {
    RouterLink,
  },
  setup() {
    const store = useStore();
    const userData = computed(() => store.state.userData);

    const logout = async () => {
      try {
        await firebase.auth().signOut();
        // 登出後切換到 all
        store.commit("setState", { key: "filter", value: "all" });

        // 登出後強制重整一次頁面
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      }
    };

    return { userData, logout };
  },
};
</script> 