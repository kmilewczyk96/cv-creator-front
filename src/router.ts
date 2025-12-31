import {createMemoryHistory, createRouter} from "vue-router";

import AuthPage from "@/pages/AuthPage.vue";
import EditorPage from "@/pages/EditorPage.vue";
import HomePage from "@/pages/HomePage.vue";


const pages = [
  {path: "/", component: HomePage},
  {path: "/auth", component: AuthPage},
  {path: "/editor", component: EditorPage},
]

const router = createRouter({
  history: createMemoryHistory(),
  routes: pages,
});

export default router;
