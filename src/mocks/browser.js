import { setupWorker } from "msw/browser"; // Correcto
import { handlers } from "./handlers";

// Configura el worker con los handlers
export const worker = setupWorker(...handlers);
