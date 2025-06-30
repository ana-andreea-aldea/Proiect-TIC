<template>
  <div class="form-container">
    <h2>Add a student</h2>

    <form @submit.prevent="onSubmit" class="student-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="name" required />
      </div>

      <div class="form-group">
        <label for="grade">Grade</label>
        <input id="grade" type="number" v-model="grade" required />
      </div>

      <button type="submit">Add student</button>
    </form>
  </div>
</template>

<script>
import router from "../router"    
export default {
    data () {
      return {
        token: localStorage.getItem("token"),
          name: null,
          grade: null
      }
    },

    methods: {
      onSubmit: function() {
        var globalRequestParameters = {
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin", 
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer",
      }
      var token = localStorage.getItem("token");
      if (token) {
        let parameters = { ...globalRequestParameters } // shallow object clone
        parameters.method = "POST"
        parameters.headers.authorization = `Bearer ${token}` 
        parameters.body = JSON.stringify({
          name: this.name,
          grade: this.grade,
          books: []
        });
        
        console.log(parameters.headers.authorization);
        
        // adding the token to the request
        fetch("http://localhost:3000/students", parameters)
          .then(() =>{     
            alert("The student has been created!")
            router.replace("/students");
          })
          .then(res => console.log(res));
        }
      }
    }
}
</script>

<style scoped src="@/assets/forms.css"></style>