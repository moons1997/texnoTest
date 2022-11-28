import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import TestView from "@/views/TestView.vue";
import FormsView from "@/views/FromsView.vue";
import StudentView from "@/views/StudentView.vue";
import LoginView from "@/views/LoginView.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/test",
    name: "test",
    component: TestView,
  },
  {
    path: "/forms",
    name: "forms",
    component: FormsView,
  },
  {
    path: "/studet",
    name: "studet",
    component: StudentView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
