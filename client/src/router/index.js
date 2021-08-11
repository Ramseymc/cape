import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/sales",
    name: "salesstart",
    component: () =>
      import(/* webpackChunkName: "salesstart" */ "../views/SalesStart.vue"),
  },
  {
    // data grid of the salesinfo table with CRUD functionality
    path: "/salesinfo",
    name: "salesinfo",
    component: () =>
      import(/* webpackChunkName: "salesinfo" */ "../views/SalesInfo.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
