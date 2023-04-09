<template lang="pug">
.w-full.h-full.flex.justify-center.items-center.bg-slate-50
  .absolute.top-4.left-4
    RouterLink.text-xl.font-bold(to="/") {{ "Back Home" }}
  .max-w-xs.max-h-96.bg-white.p-8.shadow-lg.shadow-slate-300.rounded-lg(
    class="w-11/12 h-5/6"
  )
    .flex.flex-col.items-center.h-full.gap-4
      h2.text-2xl {{ "Login" }}
      form.grow.flex.flex-col.w-full.gap-5(@submit.prevent="login")
        .flex.flex-col.gap-2
          label(for="email") {{ "Email" }}
          input#email.border.border-slate-300.rounded.h-8.px-2.text-sm(
            v-model="user.email",
            type="email",
            name="email",
            placeholder="Enter Email",
            required
          )
        .flex.flex-col.gap-2
          label(for="password") {{ "密碼" }}
          input#password.border.border-slate-300.rounded.h-8.px-2.text-sm(
            v-model="user.pwd",
            type="password",
            name="password",
            autocomplete="on",
            placeholder="Enter Password",
            required
          )
        input.bg-blue-700.rounded.cursor-pointer.text-white.text-sm.py-2.shadow-lg(
          type="submit",
          value="Login",
          class="hover:shadow-slate-400"
        )
        .flex.gap-2.justify-center
          span.text-slate-400.text-sm {{  "Don't have account?"  }}
          RouterLink.text-sky-600.text-sm(to="/register") {{ "Sign Up" }}
</template>


<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import firebase from "@/utils/firebase";
export default {
  setup() {
    const router = useRouter();
    const user = reactive({ email: "", pwd: "" });

    const login = () => {
      const { email, pwd } = user;

      firebase
        .auth()
        .signInWithEmailAndPassword(email, pwd)
        .then((res) => {
          console.log("res", res);

          alert("success!");
          router.push({ path: "/" });
        })
        .catch((error) => {
          console.log("error code", error.code);
          switch (error.code) {
            case "auth/invalid-email":
              alert("invalid-email!");
              break;
            case "auth/user-not-found":
              alert("user-not-found!");
              break;
            case "auth/wrong-password":
              alert("wrong-password!");
              break;
            default:
              alert("unknown error");
              break;
          }
          user.email = "";
          user.pwd = "";
        });
    };

    return { user, login };
  },
};
</script>

