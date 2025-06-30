<template>
  <div class="register-card">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>E-mail</label>
        <input v-model="email" required />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit" class="submit-button">Register</button>
    </form>
  </div>
</template>

<script>
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
        const response = await fetch("http://localhost:3000/register", {
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
          throw new Error("Registration failed!")
        }

        alert("User registered!")
        router.push({ name: "Login" })
      } catch (error) {
        alert("Error: " + error.message)
      }
    }
  }
}
</script>

<style scoped src="@/assets/register.css"></style>