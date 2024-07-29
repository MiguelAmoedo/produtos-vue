<template>
    <div class="register-container">
      <div class="register-form">
        <h1>Registro de usuário</h1>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="name">Nome:</label>
            <input
              v-model="name"
              id="name"
              type="text"
              placeholder="Nome"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              v-model="email"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Senha:</label>
            <input
              v-model="password"
              id="password"
              type="password"
              placeholder="Senha"
              required
            />
          </div>
          <div class="form-group">
            <label for="password_confirmation">Confirmar Senha:</label>
            <input
              v-model="passwordConfirmation"
              id="password_confirmation"
              type="password"
              placeholder="Confirmar Senha"
              required
            />
          </div>
          <button type="submit">Registrar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import AuthServices from '@/services/authServices';
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const passwordConfirmation = ref('');
  
  const router = useRouter();
  
  async function handleRegister() {
    if (password.value !== passwordConfirmation.value) {
      alert('As senhas não coincidem');
      console.error('As senhas não coincidem');
      return;
    }
  
    // Criação do FormData
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('password', password.value);
    formData.append('password_confirmation', passwordConfirmation.value);
  
    try {
      const response = await AuthServices.register(formData);
      console.log('Registro bem-sucedido:', response);
      alert('Cadastro concluído');
      router.push('/');
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  }
  </script>
  
  <style scoped>
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #ffffff;
  }
  
  .register-form {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
  }
  
  .register-form h1 {
    margin-bottom: 1rem;
    font-size: 24px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button {
    display: block;
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  