import {createRouter, createWebHistory} from "vue-router";

import AuthPage from "@/pages/AuthPage.vue";
import EditorPage from "@/pages/EditorPage.vue";
import HomePage from "@/pages/HomePage.vue";
import {useAuthStore} from "@/stores/authStore.ts";


const pages = [
  {path: "/", name: "home", component: HomePage, meta: {requiresAuth: true}},
  {path: "/auth", name: "auth", component: AuthPage, meta: {guestOnly: true}},
  {path: "/free-editor", name: "free-editor", component: EditorPage, meta: {guestOnly: true}},
]

const router = createRouter({
  history: createWebHistory(),
  routes: pages,
});

router.beforeEach((to, _, next): void => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/auth");
  } else if (to.meta.guestOnly && authStore.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
