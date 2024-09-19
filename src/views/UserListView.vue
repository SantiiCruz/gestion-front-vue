<template>
  <div class="user-list-container">
    <!-- Header Section -->
    <div class="header-section">
      <h1>Usuarios</h1>
      <button class="btn-primary" @click="goToCreateUser">Nuevo usuario</button>
    </div>

    <!-- Search and Filters -->
    <div class="search-filters">
      <input type="text" placeholder="Buscar" class="input-search" />
      <select class="select-filter">
        <option>Edad</option>
        <option>Nombre</option>
      </select>
      <button class="btn gray-btn">Limpiar</button>
    </div>

    <!-- User List Component -->
    <UserList :users="users" />
  </div>
</template>

<script>
import UserList from "@/components/UserList.vue";

export default {
  name: "UserListView",
  components: {
    UserList,
  },
  data() {
    return {
      users: [], // Aquí almacenaremos los usuarios
    };
  },
  created() {
    this.fetchUsers(); // Llamar al método cuando el componente es creado
  },
  methods: {
    goToCreateUser() {
      this.$router.push("/create");
    },
    fetchUsers() {
      // Aquí llamamos a nuestro mock service para obtener los usuarios.
      fetch("/usuarios")
        .then((response) => response.json())
        .then((data) => {
          this.users = data; // Actualizar la lista de usuarios
        })
        .catch((error) => {
          console.error("Error al obtener usuarios:", error);
        });
    },
  },
};
</script>

<style scoped>
.user-list-container {
  min-height: 100vh;
  padding: 5%;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-section h1 {
  font-size: 36px;
  color: var(--font-color);
  font-weight: initial;
}

.search-filters {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.input-search {
  width: 250px;
}

.input-search,
.select-filter {
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 15px;
}

.input-search:focus {
  outline: none;
  border: 2px solid #fdf0f0;
}

.gray-btn {
  border-radius: 5px;
  border: none;
  padding: 10px 20px;
  background-color: #6c757d;
  color: var(--font-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.gray-btn:hover {
  background-color: #495057;
}
@media screen and (max-width: 768px) {
  .header-section {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 20px;
  }

  .search-filters {
    flex-direction: column;
    align-items: flex-start;
  }

  .input-search {
    width: 94%;
    margin-bottom: 10px;
  }

  .select-filter,
  .gray-btn {
    width: 100%;
    margin-bottom: 10px;
  }

  .gray-btn {
    align-self: stretch;
  }
}
</style>
