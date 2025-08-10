import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../components/LandingPage.vue";

const routes = [
  { path: "/", component: LandingPage },
  // Add another path if kailangan nang pumunta sa other pages
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
