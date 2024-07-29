<template>
    <div id="app" class="container">
      <Header />
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-if="loading" class="spinner"></div>
      <div v-else>
        <div class="search-container">
          <input
            v-model="searchTerm"
            @input="debouncedSearchProducts"
            type="text"
            placeholder="Pesquisar produtos..."
            class="search-input"
          />
        </div>
        <strong>Melhores Produtos:</strong> <br /> <br />
        <div class="row">
          <div v-for="product in paginatedProducts" :key="product.id" class="col">
            <div class="card mb-3">
              <img :src="product.image" alt="Product Image" class="card-img mb-2" />
              <div class="card-body">
              
                <div v-if="!product.editing">
                  <h5 class="card-title">{{ product.name }}</h5>
                </div>
                <div v-else>
                  <input
                    v-model="product.name"
                    @blur="updateProduct(product.id, product)"
                    @keydown.enter="updateProduct(product.id, product)"
                    class="form-control mb-2"
                    placeholder="Nome do produto"
                  />
                </div>

                <h6 class="card-subtitle mb-2 text-muted">ID: {{ product.id }}</h6>     
                <div v-if="!product.editing">
                  <p class="card-text">
                    <strong>Descrição:</strong> {{ product.description }}<br />
                    <strong>Preço:</strong> {{ product.price }}<br />
                    <strong>Data de Validade:</strong> {{ product.expiry_date }}<br />
                    <strong>Categoria:</strong> {{ product.category.name }}<br />
                  </p>
                </div>
                <div v-else>
                  <textarea
                    v-model="product.description"
                    @blur="updateProduct(product.id, product)"
                    @keydown.enter="updateProduct(product.id, product)"
                    class="form-control mb-2"
                    placeholder="Descrição do produto"
                  ></textarea>
                  <input
                    v-model="product.price"
                    @blur="updateProduct(product.id, product)"
                    @keydown.enter="updateProduct(product.id, product)"
                    class="form-control mb-2"
                    placeholder="Preço"
                  />
                  <input
                    v-model="product.expiry_date"
                    @blur="updateProduct(product.id, product)"
                    @keydown.enter="updateProduct(product.id, product)"
                    class="form-control mb-2"
                    placeholder="Data de Validade"
                  />
                  <input
                    v-model="product.category.name"
                    @blur="updateProduct(product.id, product)"
                    @keydown.enter="updateProduct(product.id, product)"
                    class="form-control mb-2"
                    placeholder="Nome da Categoria"
                  />
                </div>
                
                <div class="card-footer">
                  <button class="btn btn-primary" @click="toggleEdit(product.id)">
                    {{ product.editing ? 'Salvar' : 'Editar' }}
                  </button>
                  <button class="btn btn-danger" @click="confirmDelete(product.id)">Excluir</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br>
        <br>
        <div class="pagination">
          <button
            :disabled="currentPage === 1"
            @click="prevPage"
            class="btn btn-secondary"
          >
            Anterior
          </button>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <button
            :disabled="currentPage === totalPages"
            @click="nextPage"
            class="btn btn-secondary"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted, computed } from 'vue';
  import ApiServices from '../services/apiServices';
  import Header from '../components/Header.vue';
  
  interface Category {
    id: number;
    name: string;
  }
  
  interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    expiry_date: string;
    image: string;
    category: Category;
    editing?: boolean;
  }
  
  const products = ref<Product[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const searchTerm = ref('');
  const currentPage = ref(1);
  const itemsPerPage = 9;
  const debounceTimeout = ref<number | null>(null);
  
  const fetchProducts = async (search: string = '') => {
    try {
      loading.value = true;
      const response = await ApiServices.searchProducts(search);
      products.value = response.data;
      console.log(response);
    } catch (err) {
      error.value = 'Erro ao buscar produtos';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };
  
  const debouncedSearchProducts = () => {
    if (debounceTimeout.value) {
      clearTimeout(debounceTimeout.value);
    }
    debounceTimeout.value = setTimeout(() => {
      fetchProducts(searchTerm.value);
    }, 300); 
  };
  
  const toggleEdit = (id: number) => {
    const product = products.value.find(p => p.id === id);
    if (product) {
      product.editing = !product.editing;
      if (!product.editing) {
        updateProduct(id, product);
      }
    }
  };
  
  const updateProduct = async (id: number, updatedProduct: Product) => {
    try {
      const response = await ApiServices.updateProduct(id, updatedProduct);
      console.log('Resposta de atualização:', response);
    } catch (error) {
      console.error('Erro ao atualizar produto', error);
      alert('Erro ao atualizar produto');
    }
  };
  
  const deleteProduct = async (id: number) => {
    try {
      await ApiServices.deleteProduct(id);

      products.value = products.value.filter(p => p.id !== id);
    } catch (error) {
      console.error('Erro ao excluir produto', error);
      alert('Erro ao excluir produto');
    }
  };
  
  const confirmDelete = (id: number) => {
    if (window.confirm('Você tem certeza que deseja excluir este produto?')) {
      deleteProduct(id);
    }
  };
  
  const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage));
  
  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return products.value.slice(start, end);
  });
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  
  onMounted(() => {
    fetchProducts();
  });
  </script>
  
  <style src="./style.css"></style>
  