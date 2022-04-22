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
        console.log("email:", this.email);
        console.log("password:", this.password);
      }
    },
  },
};
</script>

<style>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
p {
  text-align: center;
}
button {
  background: #3b8ce7;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}
submit {
  text-align: center;
}
</style>
