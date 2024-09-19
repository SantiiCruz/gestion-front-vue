<template>
  <div class="user-create-container">
    <div class="header-section">
      <h1>Nuevo Usuario</h1>
    </div>
    <div class="option-section">
      <button class="btn-primary" @click="goBack">Regresar</button>
    </div>

    <!-- User Form Component -->
    <UserForm />
  </div>
</template>

<script>
import UserForm from "@/components/UserForm.vue";

export default {
  name: "UserCreateView",
  components: {
    UserForm,
  },
  methods: {
    goBack() {
      this.$router.push("/"); // Regresa a la página de usuarios
    },
  },
};
</script>

<style scoped>
.user-create-container {
  min-height: 100vh;
  padding: 5%;
}

/* Header section */
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

.option-section {
  margin: auto;
}
</style>
