import { http, HttpResponse } from "msw";

// Datos mockeados
const usersMock = [
  {
    nombre: "Juan",
    apellido: "Alvarez",
    fechaNacimiento: "1990-05-14",
  },
  {
    nombre: "Laura",
    apellido: "Fernandez",
    fechaNacimiento: "2000-07-31",
  },
  {
    nombre: "Andrea",
    apellido: "Andrade",
    fechaNacimiento: "2007-09-17",
  },
];

export const handlers = [
  // Mock para obtener usuarios
  http.get("/usuarios", () => {
    return HttpResponse.json(usersMock, { status: 200 });
  }),

  // Mock para crear un nuevo usuario
  http.post("/usuarios", async ({ request }) => {
    try {
      // Obtenemos los datos del nuevo usuario desde el cuerpo de la solicitud
      const newUser = await request.json();

      // Validaciones básicas antes de agregar el usuario
      if (!newUser.nombre || !newUser.apellido || !newUser.fechaNacimiento) {
        console.error("Datos incompletos:", newUser);
        return HttpResponse.json(
          { error: "Faltan datos del usuario" },
          { status: 400 }
        );
      }

      // Simulamos la inserción del usuario en el mock
      usersMock.push(newUser);

      // Devolvemos el nuevo usuario creado
      console.log("Usuario agregado:", newUser);
      //Si quieremos devolver el nuevo usuario creado
      // return HttpResponse.json(newUser, { status: 201 });
      //Status solicitado
      return new HttpResponse(null, { status: 204 }); // No se devuelve cuerpo
    } catch (error) {
      // Captura y log de errores
      console.error("Error procesando la solicitud:", error);
      return HttpResponse.json(
        { error: "Error procesando la solicitud" },
        { status: 500 }
      );
    }
  }),
];
