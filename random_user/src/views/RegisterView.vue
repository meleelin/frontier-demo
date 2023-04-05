<template lang="pug">
.w-full.h-full.flex.justify-center.items-center
  .max-w-md.max-h-96.bg-slate-200.border-2.border-slate-300.p-4(class="w-11/12 h-5/6")
    .flex.flex-col.h-full
      .flex.justify-center
        h2.text-2xl 註冊
      form.grow.flex.flex-col.justify-between(@submit.prevent="register")
        .flex.flex-col
          label(for="name") Name:
          input#name.border-2.border-slate-300(
            v-model="user.name",
            type="name",
            name="name",
            required
          )
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
        .flex.justify-center.items-center.border-2.border-slate-300.cursor-pointer
          input.py-2(type="submit", value="註冊")
        .flex.flex.gap-2
          span Already have an account?
          RouterLink(to="/login") Log in
</template>

<script>
import firebase from "../utils/firebase";
import "firebase/compat/auth";
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        pwd: "",
      },
    };
  },
  methods: {
    register() {
      console.log("user", this.user);
      const { email, pwd } = this.user;

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, pwd)
        .then((res) => {
          console.log("res", res);
          this.$router.push({ path: "/" });
        })
        .catch((error) => {
          console.log("error code", error.code);
          switch (error.code) {
            case "auth/email-already-in-use":
              alert("auth/email-already-in-use");
              break;
            case "auth/invalid-email":
              alert("auth/invalid-email");
              break;
            case "auth/weak-password":
              alert("auth/weak-password");
              break;
            default:
              alert("unknown error");
              break;
          }
        });
    },
  },
};
</script>

<style>
</style>