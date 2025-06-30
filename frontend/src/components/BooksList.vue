<template>
  <div>
    <h1>Books list for student {{ student.name }}</h1>
    <router-link :to="{ name: 'CreateBook', params: { id: id } }" class="add-button">Add book</router-link>

    <table class="book-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Pages</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, index) in books" :key="index">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.year }}</td>
          <td>{{ book.pages }}</td>
          <td>
            <router-link :to="{ name: 'EditBook', params: { id: student.id, idBook: index } }" class="action-button">Edit</router-link>
          </td>
          <td>
            <button @click="deleteBook(index)" class="action-button delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id: this.$route.params.id,
      student: [],
      books: []
    }
  },
  created() {
    const id = this.$route.params.id;
    axios.get("http://localhost:3000/students/" + id, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }).then(response => {
      this.student = response.data;
      this.books = this.student.books;
    });
  },
  methods: {
    deleteBook: function (idBook) {
      axios.delete(`http://localhost:3000/students/${this.$route.params.id}/deleteBook/${idBook}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then(() => {
        axios.get("http://localhost:3000/students/" + this.$route.params.id, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(response => {
          this.books = response.data.books;
        });
      });
    }
  }
}
</script>

<style scoped src="@/assets/booksList.css"></style>
