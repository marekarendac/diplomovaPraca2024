<template>
  <form @submit.prevent="handleSubmit">
    <label>Email:</label>
    <input type="email" required v-model="email" />
    <!-- v-model - metoda vyuzivana pre 2-way data binding (prepojil som input usera a variables email a password) -->

    <label>Password:</label>
    <input type="password" required v-model="password" />
    <div v-if="passwordError">{{ passwordError }}</div>
    <br />
    <div class="submit">
      <button>Odošli</button>
    </div>
  </form>
</template>

<script>
import Api from "@/services/Api.js";
export default {
  data() {
    return {
      email: "",
      password: "",
      passwordError: "",
    };
  },
  methods: {
    handleSubmit() {
      this.passwordError =
        this.password.length > 5 ? "" : "Heslo musí mať viac ako 5 znakov";

      if (!this.passwordError) {
        Api.post("/test", { email: this.email, password: this.password }).then(
          (response) => {
            console.log(response.data);
          }
        );
      }
    },
  },
};
</script>
