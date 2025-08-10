import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../components/LandingPage.vue";
import AvailableStalls from "../components/available_stalls/AvailableStalls.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/available-stalls", component: AvailableStalls },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
