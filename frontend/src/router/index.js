import { createRouter, createWebHistory } from "vue-router"
import Students from "@/views/Students.vue"
import BooksList from "@/components/BooksList.vue"
import StudentsList from "@/components/StudentsList.vue"
import CreateStudent from "@/components/CreateStudent.vue"
import CreateBook from "@/components/CreateBook.vue"
import EditStudent from "@/components/EditStudent"
import EditBook from "@/components/EditBook.vue"
import Register from "@/components/Register.vue"
import Login from "@/components/Login.vue"

const routes = [
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/students",
    name: "Students",
    component: StudentsList
  },
  {
    path: "/students/:id/books",
    name: "StudentBooks",
    component: BooksList
  },
  {
    path: "/students/add",
    name: "CreateStudent",
    component: CreateStudent
  },
  {
    path: "/students/:id/books/new",
    name: "CreateBook",
    component: CreateBook
  },
  {
    path: "/students/:id",
    name: "StudentDetails",
    component: Students
  },
  {
    path: "/students/:id/edit",
    name: "EditStudent",
    component: EditStudent
  },
   {
    path: "/students/:id/book/:idBook",
    name: "EditBook",
    component: EditBook
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
