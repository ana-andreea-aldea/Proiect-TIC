<template>
  <div class="form-container">
    <h2>Edit book info</h2>

    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="title">Title</label>
        <input id="title" v-model="book.title" required />
      </div>

      <div class="form-group">
        <label for="author">Author</label>
        <input id="author" v-model="book.author" required />
      </div>

      <div class="form-group">
        <label for="year">Publication year</label>
        <input id="year" type="number" v-model="book.year" required />
      </div>

      <div class="form-group">
        <label for="pages">Number of pages</label>
        <input id="pages" type="number" v-model="book.pages" required />
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
      id: this.$route.params.id,         // ID-ul elevului
      idBook: this.$route.params.idBook, // ID-ul cartii
      book: {
        title: "",
        author: "",
        year: "",
        pages: ""
      }
    };
  },

  created() {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/students/${this.id}/books/${this.idBook}`, {
      headers: {
        Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (!res.ok) throw new Error("The book details could not be loaded!");
        return res.json();
      })
      .then(data => {
        this.book = data;
      })
      .catch(err => {
        console.error(err);
        alert("Error when trying to access the book details!");
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
          title: this.book.title,
          author: this.book.author,
          year: this.book.year,
          pages: this.book.pages
        })
      };

      fetch(`http://localhost:3000/students/${this.id}/books/${this.idBook}`, requestOptions)
        .then(res => {
          if (!res.ok) throw new Error("Book updating error!");
          return res.json();
        })
        .then(() => {
          alert("The book details have been updated!");
          router.replace(`/students/${this.id}/books`);
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
