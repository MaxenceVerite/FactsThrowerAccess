import Vue from "vue";
import VueRouter from "vue-router";
import AdminHome from "../components/admin/AdminHome";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: AdminHome,
  },
  {
    path: "/admin/facts",
    name: "FactsView",
    component: () => import("../components/admin/facts/FactsView"),
  },
  {
    path: "/admin/tags",
    name: "TagsView",
    component: () => import("../components/admin/tags/TagsView"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
