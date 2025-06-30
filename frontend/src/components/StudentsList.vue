<template>
  <div class="students-list">
    <div class="logout-bar">
      <button @click="logOut()">Log out</button>
    </div>

    <h1>Students</h1>

    <router-link :to="{ name: 'CreateStudent' }" class="add-button">Add student</router-link>

    <table class="custom-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Grade</th>
          <th>Books</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in students" :key="index">
          <td>{{ student.name }}</td>
          <td>{{ student.grade }}</td>
          <td>
            <router-link :to="{ name: 'StudentBooks', params: { id: student.id } }">
              See books
            </router-link>
          </td>
          <td>
            <router-link :to="{ name: 'EditStudent', params: { id: student.id } }">
              Edit student
            </router-link>
          </td>
          <td>
            <button @click="deleteStudent(student.id)">Delete student</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";
import store from "../store";

export default {
  data() {
    return {
      token: localStorage.getItem("token"),
      students: []
    }
  },
  created() {
    axios.get("http://localhost:3000/students", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }).then(response => {
      this.students = response.data;
    });
  },
  methods: {
    deleteStudent: function (id) {
      axios.delete("http://localhost:3000/students/" + id, {
        headers: {
          authorization: "Bearer " + this.token,
        }
      }).then(() => {
        axios.get("http://localhost:3000/students", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(response => {
          this.students = response.data;
        })
      }
      )
    }, 
    logOut: function () {
      store.dispatch("logout")
      router.replace('/');
    }
  },
}
</script>

<style scoped src="@/assets/studentsList.css"></style>