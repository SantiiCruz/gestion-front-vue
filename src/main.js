import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/global.css"; // Importar los estilos globales

/**
 * Inicializa el Mock Service Worker (MSW) solo si estamos en un entorno de desarrollo.
 */
async function prepareApp() {
  if (process.env.NODE_ENV === "development") {
    const { worker } = await import("./mocks/browser");
    return worker.start();
  }
  return Promise.resolve(); // Si no es desarrollo, continúa sin MSW
}

const app = createApp(App);

// Se asegura de que MSW esté preparado antes de montar la aplicación
prepareApp().then(() => {
  app.use(router).mount("#app");
});
