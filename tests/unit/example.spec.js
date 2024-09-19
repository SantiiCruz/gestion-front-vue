import { shallowMount } from "@vue/test-utils";
import UserForm from "@/components/UserForm.vue"; // Ajusta la ruta según tu estructura
import { server } from './msw.setup'; // Asegúrate de importar el archivo de configuración
import { handlers } from './mocks/handlers';
import '@testing-library/jest-dom';


// Configura el servidor MSW antes de todas las pruebas
beforeAll(() => server.listen());

// Resetea el estado del servidor MSW después de cada prueba
afterEach(() => server.resetHandlers());

// Apaga el servidor MSW después de todas las pruebas
afterAll(() => server.close());

describe('UserForm.vue', () => {
  it('should render form and handle form submission', async () => {
    const wrapper = shallowMount(UserForm);

    // Simula la entrada en el formulario
    await wrapper.setData({
      nombre: 'Carlos',
      apellido: 'Diaz',
      fechaNacimiento: '1995-03-22'
    });

    // Envia el formulario
    await wrapper.find('form').trigger('submit.prevent');

    // Verifica si la solicitud POST se realizó y el estado del modal es correcto
    expect(wrapper.vm.modalVisible).toBe(true);
  });

  test('GET /usuarios debe devolver una lista de usuarios', async () => {
    // Usamos fetch para hacer la solicitud GET a /usuarios
    const response = await fetch('/usuarios');
    const data = await response.json();

    // Verificar que el status code sea 200
    expect(response.status).toBe(200);

    // Verificar que los datos sean los mockeados
    expect(data).toEqual([
      {
        nombre: 'Juan',
        apellido: 'Alvarez',
        fechaNacimiento: '1990-05-14',
      },
      {
        nombre: 'Laura',
        apellido: 'Fernandez',
        fechaNacimiento: '2000-07-31',
      },
      {
        nombre: 'Andrea',
        apellido: 'Andrade',
        fechaNacimiento: '2007-09-17',
      },
    ]);
  });

  test('POST /usuarios debe crear un nuevo usuario', async () => {
    // Datos del nuevo usuario a enviar
    const newUser = {
      nombre: "Carlos",
      apellido: "Diaz",
      fechaNacimiento: "1995-03-22"
    };

    // Usamos fetch para hacer la solicitud POST a /usuarios
    const response = await fetch('/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    // Verificar que el status code sea 204 (sin contenido)
    expect(response.status).toBe(204);

    // Hacemos nuevamente un GET para verificar que el nuevo usuario fue agregado
    const getResponse = await fetch('/usuarios');
    const users = await getResponse.json();

    expect(users).toContainEqual(newUser);
  });

  test('POST /usuarios debe devolver 400 si faltan datos', async () => {
    // Datos del nuevo usuario incompletos
    const incompleteUser = {
      nombre: "Carlos"
    };

    // Usamos fetch para hacer la solicitud POST a /usuarios
    const response = await fetch('/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(incompleteUser),
    });

    // Verificar que el status code sea 400
    expect(response.status).toBe(400);

    const errorData = await response.json();

    // Verificar que el mensaje de error sea el esperado
    expect(errorData).toEqual({
      error: "Faltan datos del usuario"
    });
  });
});
