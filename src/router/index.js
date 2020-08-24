import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Melon from "../views/MelonData.vue";
import Visualization from "../views/DataVirtual.vue"
import DataTable from '../views/DataTable.vue'
import Detail from "../views/MelonDetail.vue"

import firebase from "../components/firebase-connect/firebaseInit";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/melon",
    name: "Controller",
    component: Melon,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path:"/visualization",
    name:"Visualization",
    component: Visualization,
    meta: { requiresAuth: true },
  },
  {
    path:"/visualization/:id",
    name:"all Visualization",
    component: DataTable,
    meta: { requiresAuth: true },
  },
  {
    path:"/melon/detail",
    name:"melon detail",
    component: Detail,
    meta: { requiresAuth: true },
  },

  {
    path: "/about",
    name: "About",
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//block router
router.beforeEach((to, from, next) => {
  const isAuthenticated = firebase.auth().currentUser;
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isAuthenticated) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
