<template>
  <div class="login-container">
    <div class="login-form">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
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
        <button type="submit">Login</button>
        <p class="link">
          <a @click="redirectToRegister">Criar conta</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthServices from '@/services/authServices';

const email = ref('');
const password = ref('');

const router = useRouter();

async function handleLogin() {
  try {
    const response = await AuthServices.login(email.value, password.value);
    console.log('Login bem-sucedido:', response);
    router.push('/produtos');
  } catch (error) {
    if (error.response && error.response.status === 401) {
      alert('Senha ou email estão incorretos');
    } else {
      console.error('Erro ao fazer login:', error);
    }
  }
}

function redirectToRegister() {
  router.push('/cadastro');
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ffffff;
}

.login-form {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.login-form h1 {
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

.link {
  margin-top: 1rem;
  text-align: center;
}

.link a {
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
}

.link a:hover {
  text-decoration: underline;
}
</style>
