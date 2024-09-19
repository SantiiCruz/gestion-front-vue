<template>
  <table class="user-list-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Edad</th>
        <th>Ciudad</th>
        <th>Eventos</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="user.id">
        <!-- El número del array -->
        <td data-label="ID">{{ index + 1 }}</td>
        <td data-label="Nombre">
          <div class="user-info">
            <span>{{ user.nombre }} {{ user.apellido }}</span>
          </div>
        </td>
        <td data-label="Edad">{{ calculateAge(user.fechaNacimiento) }} años</td>
        <td data-label="Ciudad">--</td>
        <td data-label="Eventos">
          <span class="tag blue-tag">1 Evento</span>
        </td>
        <td data-label="Acciones">
          <div class="actions">
            <button class="btn light-green-btn">Editar</button>
            <button class="btn light-red-btn">Eliminar</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "UserList",
  props: {
    users: Array,
  },
  methods: {
    calculateAge(fechaNacimiento) {
      const birthDate = new Date(fechaNacimiento);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    },
  },
};
</script>

<style scoped>
.user-list-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 2px 10px;
}

.user-list-table th {
  text-align: left;
  color: var(--font-color-light);
  padding: 10px 15px;
  font-weight: normal;
  background-color: #c0ddee1a;
  border-radius: 2px;
}

.user-list-table td {
  background-color: var(--font-color-light);
  padding: 15px;
  font-size: 14px;
  text-align: left;
  border-radius: 2px;
}

.user-info {
  display: flex;
  align-items: center;
}

.tag {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.blue-tag {
  background-color: var(--btn-bg-active-color);
  color: var(--font-color-dark);
}

.actions .btn {
  margin-right: 10px;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  /* Transición suave */
}

.light-green-btn {
  border: 1px solid #c3e6cb;
  background-color: #d4edda;
  color: #155724;
}

.light-red-btn {
  border: 1px solid #f5c6cb;
  background-color: #f8d7da;
  color: #721c24;
}

/* Estilos de hover para los botones de la tabla */
.actions .btn:hover {
  transform: scale(1.05);
  /* Expande el botón */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* Añade sombra */
}

.light-green-btn:hover {
  background-color: #c3e6cb;
  border-color: #a1d4b2;
  color: #0b5121;
}

.light-red-btn:hover {
  background-color: #f5c6cb;
  border-color: #f1aeb1;
  color: #5d0b10;
}

@media screen and (max-width: 768px) {
  .user-list-table {
    width: 100%;
    overflow-x: auto;
  }

  .user-list-table thead {
    display: none;
    /* Ocultar encabezados en pantallas pequeñas */
  }

  .user-list-table tbody,
  .user-list-table tr {
    display: block;
    width: 100%;
  }

  .user-list-table tr {
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }

  .user-list-table td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    font-size: 14px;
    margin: 5px;
  }

  .user-list-table td::before {
    content: attr(data-label);
    font-weight: bold;
    text-transform: uppercase;
  }

  .actions {
    display: flex;
    justify-content: space-evenly;
    margin-top: 10px;
  }
}
</style>
