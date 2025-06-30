<template>
  <div class="form-container">
    <h2>Edit student info</h2>

    <form @submit.prevent="onSubmit" class="student-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="student.name" required />
      </div>

      <div class="form-group">
        <label for="grade">Grade</label>
        <input id="grade" type="number" v-model="grade" required />
      </div>

      <button type="submit">Save changes</button>
    </form>
  </div>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      student: {
        name: "",
        grade: "",
        books: []
      }
    };
  },

  created() {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/students/${this.$route.params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (!res.ok) throw new Error("The student info could not be loaded!");
        return res.json();
      })
      .then(data => {
        this.student = data;
      })
      .catch(err => {
        console.error(err);
        alert("Error when trying to access the student info!");
      });
  },

  methods: {
    onSubmit() {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication needed!");
        return;
      };

      const requestOptions = {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          name: this.student.name,
          grade: this.student.grade,
          books: this.student.books
        })
      };

      fetch(`http://localhost:3000/students/${this.$route.params.id}`, requestOptions)
        .then(res => {
          if (!res.ok) throw new Error("Student uodating error!");
          return res.json();
        })
        .then(() => {
          alert("The student info has been updated!");
          router.replace("/students");
        })
        .catch(err => {
          console.error(err);
          alert("Error!");
        });
    }
  }
};
</script>

<style scoped src="@/assets/forms.css"></style>
