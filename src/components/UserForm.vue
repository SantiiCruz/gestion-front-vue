<template>
  <div class="user-form-container">
    <form @submit.prevent="submitForm">
      <!-- Nombre -->
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <div class="error-group">
          <input
            v-model="nombre"
            placeholder="Ej: Mateo"
            id="nombre"
            type="text"
            class="input-field"
            required
          />
          <span v-if="errors.nombre" class="error">{{ errors.nombre }}</span>
        </div>
      </div>

      <!-- Apellido -->
      <div class="form-group">
        <label for="apellido">Apellido:</label>
        <div class="error-group">
          <input
            v-model="apellido"
            placeholder="Ej: Silva"
            id="apellido"
            type="text"
            class="input-field"
            required
          />
          <span v-if="errors.apellido" class="error">{{
            errors.apellido
          }}</span>
        </div>
      </div>

      <!-- Fecha de nacimiento -->
      <div class="form-group">
        <label for="fechaNacimiento">Fecha de Nacimiento:</label>
        <div class="error-group">
          <input
            v-model="fechaNacimiento"
            id="fechaNacimiento"
            type="date"
            class="input-field"
            required
          />
          <span v-if="errors.fechaNacimiento" class="error">{{
            errors.fechaNacimiento
          }}</span>
        </div>
      </div>

      <!-- Botón para crear usuario -->
      <button type="submit" class="btn-submit">Crear Usuario</button>
    </form>

    <!-- Modal -->
    <div v-if="modalVisible" class="modal-overlay">
      <div class="modal-content">
        <h3>Usuario creado correctamente</h3>
        <button @click="closeModal" class="btn-submit">Aceptar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: "",
      apellido: "",
      fechaNacimiento: "",
      errors: {},
      modalVisible: false, // Controla la visibilidad del modal
    };
  },
  methods: {
    async submitForm() {
      this.errors = {}; // Limpiar errores

      // Validar nombre
      if (!this.nombre) {
        this.errors.nombre = "El nombre es obligatorio.";
      } else if (!/^[a-zA-Z]+$/.test(this.nombre)) {
        this.errors.nombre = "El nombre solo debe contener letras.";
      }

      // Validar apellido
      if (!this.apellido) {
        this.errors.apellido = "El apellido es obligatorio.";
      } else if (!/^[a-zA-Z]+$/.test(this.apellido)) {
        this.errors.apellido = "El apellido solo debe contener letras.";
      }

      // Validar fecha de nacimiento
      const today = new Date();
      const hundredYearsAgo = new Date(
        today.getFullYear() - 100,
        today.getMonth(),
        today.getDate()
      );

      if (!this.fechaNacimiento) {
        this.errors.fechaNacimiento = "La fecha de nacimiento es obligatoria.";
      } else if (new Date(this.fechaNacimiento) > today) {
        this.errors.fechaNacimiento =
          "La fecha de nacimiento no puede ser futura.";
      } else if (new Date(this.fechaNacimiento) < hundredYearsAgo) {
        this.errors.fechaNacimiento =
          "La fecha de nacimiento no puede ser anterior a hace 100 años.";
      }

      // Si no hay errores, mostrar el modal de éxito
      if (Object.keys(this.errors).length === 0) {
        console.log(
          JSON.stringify({
            nombre: this.nombre,
            apellido: this.apellido,
            fechaNacimiento: this.fechaNacimiento,
          })
        );
        try {
          const response = await fetch("/usuarios", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nombre: this.nombre,
              apellido: this.apellido,
              fechaNacimiento: this.fechaNacimiento,
            }),
          });

          if (response.status === 204) {
            this.modalVisible = true; // Mostrar el modal si la creación es exitosa
            this.resetForm(); // Limpiar el formulario
          } else {
            const errorData = await response.json();
            console.error("Error al crear el usuario:", errorData.message);
          }
        } catch (error) {
          console.error("Error en la solicitud:", error);
        }
      }
    },
    resetForm() {
      this.nombre = "";
      this.apellido = "";
      this.fechaNacimiento = "";
    },
    closeModal() {
      this.modalVisible = false; // Ocultar el modal
      this.$router.push("/"); // Redirigir a la página principal
    },
  },
};
</script>

<style scoped>
/* Fondo degradado */
.user-form-container {
  display: flex;
  flex-direction: column;
  background-color: #c0ddee1a;
  box-shadow: 0 2px 5px #0000001a;
  color: var(--font-color);
  align-items: center;
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
  border-radius: 8px;
}

form {
  display: flex;
  flex-direction: column;
}

/* Estilos para los grupos de formulario */
.form-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  text-align: end;
}

/* Etiquetas alineadas a la izquierda */
label {
  flex: 1;
  font-weight: inherit;
  margin-right: 20px;
  color: var(--font-color);
}

/* Estilos para los campos de entrada alineados a la derecha */
.input-field {
  flex: 2;
  width: 100%;
  padding: 10px;
  color: var(--font-color);
  background-color: #ffffff33;
  border: 1px solid #ffffff80;
  border-radius: var(--border-radius);
  font-size: 16px;
  box-sizing: border-box;
}

.input-field::placeholder {
  color: #ffffffb3;
}

.input-field:focus {
  outline: none;
  border: 2px solid var(--font-color);
}

/* Campo de fecha de nacimiento con estilo de calendario */
input[type="date"] {
  background-color: #ffffff33;
  border: 1px solid #ffffff80;
  padding: 10px;
  border-radius: 4px;
  color: var(--font-color);
  font-size: 16px;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

/* Mensajes de error */
.error-group {
  display: flex;
  flex-direction: column;
  flex: 2;
}

.error {
  text-align: start;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  padding: 10px;
  margin-top: 5px;
  font-size: 14px;
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
}

.error::before {
  content: "⚠";
  margin-right: 10px;
  font-weight: bold;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000000a4;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  /* Asegurarse de que esté por encima de todo */
}

.modal-content {
  background-color: #4d7ca0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px #0000001a;
  text-align: center;
  max-width: 400px;
  width: 100%;
  margin: 5%;
}

.modal-content h3 {
  margin-bottom: 20px;
}

/* Ajustes para dispositivos móviles */
@media (max-width: 768px) {
  .user-form-container {
    padding: 15px;
  }
}
</style>
