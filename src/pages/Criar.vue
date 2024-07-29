<template>
  <div class="create-product-container">
    <a href="/produtos">
      Voltar para os produtos
    </a>
    <h2>Criar Novo Produto</h2>
    <form @submit.prevent="submitForm" class="create-product-form">
      <div class="form-group">
        <label for="name">Nome</label>
        <input v-model="productData.name" id="name" type="text" placeholder="Nome do produto" required />
      </div>

      <div class="form-group">
        <label for="description">Descrição</label>
        <textarea v-model="productData.description" id="description" placeholder="Descrição do produto" required></textarea>
      </div>

      <div class="form-group">
        <label for="price">Preço</label>
        <input v-model="productData.price" id="price" type="number" placeholder="Preço do produto" required />
      </div>

      <div class="form-group">
        <label for="image">Imagem</label>
        <input v-model="productData.image" id="image" type="text" placeholder="URL da imagem" required />
      </div>

      <div class="form-group">
        <label for="expiry_date">Data de Validade</label>
        <input v-model="productData.expiry_date" id="expiry_date" type="date" required />
      </div>

      <div class="form-group">
        <label for="category">Categoria</label>
        <select v-if="!isCreatingCategory" v-model="productData.category_id" id="category" required>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <button type="button" @click="startCreatingCategory" v-if="!isCreatingCategory">Criar Nova Categoria</button>
        <div v-if="isCreatingCategory">
          <label for="newCategoryName">Nome da Nova Categoria</label>
          <input v-model="newCategoryName" id="newCategoryName" type="text" placeholder="Nome da nova categoria" required />

          <button type="button" @click="createCategory">Confirmar Criação</button>
          <button type="button" @click="cancelCategoryCreation">Cancelar</button>
        </div>
      </div>

      <button type="submit" class="submit-btn">Criar Produto</button>
    </form>
  </div>
</template>


  
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import ApiServices from '../services/apiServices';

const productData = ref({
  name: '',
  description: '',
  price: '',
  expiry_date: '',
  image: '',
  category_id: 1, 
});

const categories = ref<{ id: number, name: string }[]>([]);
const isCreatingCategory = ref(false);
const newCategoryName = ref('');

const fetchCategories = async () => {
  try {
    const response = await ApiServices.getAllProducts(); 
    const allProducts = response.data;
    const uniqueCategories = Array.from(new Set(allProducts.map(p => p.category.id)))
      .map(id => allProducts.find(p => p.category.id === id)?.category)
      .filter((category): category is { id: number, name: string } => category !== undefined);

    categories.value = uniqueCategories;
  } catch (error) {
    console.error('Erro ao buscar categorias', error);
  }
};

const startCreatingCategory = () => {
  isCreatingCategory.value = true;
};

const createCategory = async () => {
  const categoryData = { name: newCategoryName.value };

  try {
    await ApiServices.createCategory(categoryData);
    alert('Categoria criada com sucesso!');
    newCategoryName.value = '';
    isCreatingCategory.value = false;
    fetchCategories();
  } catch (error) {
    console.error('Erro ao criar categoria', error);
    alert('Erro ao criar categoria');
  }
};

const cancelCategoryCreation = () => {
  isCreatingCategory.value = false;
  newCategoryName.value = '';
};

const submitForm = async () => {

  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 1);
  productData.value.expiry_date = expiryDate.toISOString().split('T')[0]; 

  try {
    const response = await ApiServices.createProduct(productData.value);
    console.log('Resposta da API:', response);
    alert('Produto criado com sucesso!');
    productData.value = {
      name: '',
      description: '',
      price: '',
      expiry_date: '',
      image: '',
      category_id: 1,
    };
  } catch (error) {
    console.error('Erro ao criar produto', error);
    alert('Erro ao criar produto');
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

  
  <style scoped>
  .create-product-container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .create-product-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  textarea {
    height: 100px;
    resize: vertical;
  }
  
  .submit-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .submit-btn:hover {
    background-color: #0056b3;
  }


.form-group select {
  width: 38.9rem;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

@media (min-width: 1900px) {
  .form-group select {
    width: 38.9rem;
  }
}


@media (min-width: 1366px) and (max-width: 1899px) {
  .form-group select {
    width: 100%; 
  }
}

@media (min-width: 768px) and (max-width: 1365px) {
  .form-group select {
    width: 100%; 
  }
}

@media (max-width: 767px) {
  .form-group select {
    width: 33.4rem;
  }
}

  </style>
  