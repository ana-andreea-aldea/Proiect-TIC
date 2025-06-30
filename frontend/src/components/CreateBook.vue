<template>
  <div class="form-container">
    <h2>Add a book for a student</h2>

    <form class="book-form" @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="title">Title</label>
        <input id="title" v-model="title" required />
      </div>

      <div class="form-group">
        <label for="author">Author</label>
        <input id="author" v-model="author" required />
      </div>

      <div class="form-group">
        <label for="year">Publication year</label>
        <input id="year" type="number" v-model="year" required />
      </div>

      <div class="form-group">
        <label for="pages">Number of pages</label>
        <input id="pages" type="number" v-model="pages" required />
      </div>

      <button type="submit">Add book</button>
    </form>
  </div>
</template>

<script>
import router from "@/router";

export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      id: this.$route.params.id, // ID-ul elevului
      title: "",
      author: "",
      year: "",
      pages: ""
    };
  },

  methods: {
    onSubmit() {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Authentication needed!");
        return;
      }

      const requestOptions = {
        method: "POST",
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
          title: this.title,
          author: this.author,
          year: this.year,
          pages: this.pages
        })
      };

      fetch(`http://localhost:3000/students/${this.id}/books`, requestOptions)
        .then((res) => {
          if (!res.ok) throw new Error("Book creation error!");
          return res.json();
        })
        .then(() => {
          alert("The book has been added!");
          router.replace(`/students/${this.id}/books`);
        })
        .catch((err) => {
          console.error(err);
          alert("Error!");
        });
    }
  }
};
</script>

<style scoped src="@/assets/forms.css"></style>