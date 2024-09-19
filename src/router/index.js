import { createRouter, createWebHistory } from "vue-router";
import UserListView from "@/views/UserListView.vue";
import UserCreateView from "@/views/UserCreateView.vue";

// Vue.use(createRouter);

// Definir las rutas
const routes = [
  { path: "/", component: UserListView },
  { path: "/create", component: UserCreateView },
];

// Crear la instancia del router
const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
