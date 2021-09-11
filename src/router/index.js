import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Servers from "../views/Servers.vue";
import Players from "@/views/Players.vue";
import Player from "@/views/Player.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard",
    },
  },
  {
    path: "/servers",
    name: "Servers",
    component: Servers,
    meta: {
      title: "Servers",
    },
  },
  {
    path: "/players",
    name: "Players",
    component: Players,
    meta: {
      title: "Players",
    },
  },
  {
    path: "/players/:uuid",
    name: "Player",
    component: Player,
    meta: {
      title: "Player",
    },
  },
  {
    path: "/about",
    name: "About",
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

export default router;
