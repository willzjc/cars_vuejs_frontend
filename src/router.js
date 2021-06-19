import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/cars",
      name: "cars",
      component: () => import("./components/CarsList")
    },
    {
      path: "/cars/:id",
      name: "car-details",
      component: () => import("./components/Car")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddCar")
    }
  ]
});
