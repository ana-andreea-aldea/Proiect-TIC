<template>
  <div class="login-card">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>E-mail</label>
        <input v-model="email" required />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit" class="submit-button">Log in</button>
    </form>
  </div>
</template>

<script>
import store from "../store"
import router from "../router"

export default {
  data() {
    return {
      email: "",
      password: ""
    }
  },

  methods: {
    async onSubmit() {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();
        const { token,email, password, message } = data;

        if (message === "Successful authentication!") {
          store.dispatch("login", {
            token,
            email,
            password
          });
          router.replace("/students");
        } else {
          alert("Authentication failed!");
        }
      } catch (error) {
        alert("Error during login: " + error.message);
      }
    }
  }
}
</script>

<style scoped src="@/assets/login.css"></style>