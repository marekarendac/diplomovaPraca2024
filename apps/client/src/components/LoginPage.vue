<template>
  <div>
    <p class="loginHeader">Prihlásenie</p>
    <form @submit.prevent="login">
      <div class="container">
        <div class="login-form">
          <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
          <!-- Move this line here -->
          <input v-model="username" placeholder="Username" />
          <input v-model="password" placeholder="Password" type="password" />
          <button :disabled="loading" @click="login">
            Login
            <span v-if="loading">Loading...</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Api from "@/services/Api";
export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    login() {
      if (this.username === "" || this.password === "") {
        console.log("Username and password are required");
        return;
      }

      this.loading = true; // Add this line

      Api.post("/login", {
        username: this.username,
        password: this.password,
      })
        .then((response) => {
          if (response.data.message === "Login successful") {
            // Wait 1.5 seconds before redirecting to / (home page)
            setTimeout(() => {
              this.$router.push("/");
              this.loading = false;
            }, 900);
          } else if (response.data.message === "Invalid username or password") {
            this.errorMessage = "Wrong credentials";
            // Wait 1.5 seconds before reloading the page
          }
        })
        .catch((error) => {
          this.loading = true;
          if (error.response && error.response.status === 401) {
            // Wait 1.5 seconds before showing the error message
            setTimeout(() => {
              this.errorMessage = "Wrong credentials";
              // Wait another 1 second before reloading the page
              setTimeout(() => {
                location.reload();
              }, 1000);
            }, 1000);
          } else {
            this.errorMessage = "An error occurred while trying to log in";
          }
        });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.error {
  color: red;
  margin-left: 20px; /* Add this line to move the box to the right */
  border: 1px solid red;
  padding: 10px;
}

.loginHeader {
  text-align: center;
  font-size: 2em;
  color: #333;
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 2px solid #333;
}
</style>
