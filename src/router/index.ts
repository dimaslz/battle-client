import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import Room from "@/views/Room.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/:roomId",
    name: "Room",
    component: Room,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
