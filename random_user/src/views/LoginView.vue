<template lang="pug">
.w-full.h-full.flex.justify-center.items-center
  .max-w-md.max-h-96.bg-slate-200.border-2.border-slate-300.p-2(class="w-11/12 h-5/6")
    .flex.flex-col
      h2.text-2xl 登入
      form(@submit.prevent="login")
        .flex.flex-col
          label(for="email") Email:
          input#email.border-2.border-slate-300(
            v-model="user.email",
            type="email",
            name="email",
            required
          )
        .flex.flex-col
          label(for="password") 密碼:
          input#password(
            v-model="user.pwd",
            type="password",
            name="password",
            required
          )
        input(type="submit", value="登入")
        .flex.gap-2
          span Don't have account?
          RouterLink(to="/register") Sign Up
</template>


<script>
import { RouterLink } from "vue-router";
import "firebase/compat/auth";
import firebase from "../utils/firebase";
export default {
  data() {
    return {
      user: {
        email: "",
        pwd: "",
      },
    };
  },
  methods: {
    login() {
      console.log("user", this.user);
      const { email, pwd } = this.user;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, pwd)
        .then((res) => {
          alert("success");
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          console.log("error code", error.code);
          switch (error.code) {
            case "auth/invalid-email":
              alert("auth/invalid-email");
              break;
            case "auth/user-not-found":
              alert("auth/user-not-found");
              break;
            case "auth/wrong-password":
              alert("auth/wrong-password");
              break;
            default:
              alert("unknown error");
              break;
          }
        });

      console.log("asdasdas", this.user);
    },
  },
};
</script>

<style>
</style>