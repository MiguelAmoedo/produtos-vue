Aqui está um exemplo de README.md para o repositório frontend do seu projeto:

---

# Frontend do Sistema de Gestão de Produtos

Este repositório contém o frontend do sistema de gestão de produtos desenvolvido com Vue.js 3 e TypeScript, utilizando Vite como bundler. O projeto consome uma API desenvolvida com Laravel.

## Tecnologias Utilizadas

- **Framework:** Vue.js 3
- **Linguagem:** TypeScript
- **Bundler:** Vite
- **Estilização:** BootstrapVue

## Configuração do Ambiente de Desenvolvimento

### Requisitos

- Node.js 14.0 ou superior
- npm ou yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/MiguelAmoedo/produtos-vue
   cd nome-do-repositorio-frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

## Estrutura das Páginas

O projeto possui as seguintes páginas, definidas nas rotas do Vue Router:

- **Login:** `/`
  - Esta página é a inicial permite a autenticação de usuários.

- **Home:** `/produtos`
  - Esta página exibe a lista de produtos.

- **Criar produto:** `/criar`
  - Esta página permite a criação de novos produtos.

- **Register:** `/cadastro`
  - Esta página permite o registro de novos usuários.



## Consumo da API

O frontend deste projeto consome a API desenvolvida com Laravel. Para mais informações sobre a API, consulte o repositório da API: [API Produtos Laravel](https://github.com/MiguelAmoedo/api-produtos-laravel).

### Exemplos de Consumo da API

- **Obter Produtos:**
  ```typescript
  import ApiServices from '../services/apiServices';

  async function fetchProducts() {
    try {
      const response = await ApiServices.getAllProducts();
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos', error);
    }
  }
  ```

- **Criar Produto:**
  ```typescript
  import ApiServices from '../services/apiServices';

  async function createProduct(productData: any) {
    try {
      const response = await ApiServices.createProduct(productData);
      console.log('Produto criado com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao criar produto', error);
    }
  }
  ```

## Considerações Finais

EsEste projeto foi desenvolvido como um desafia, para proporcionar um sistema de autenticação seguro utilizando JWT. Sinta-se à vontade para contribuir e melhorar este projeto.


---

Esta documentação cobre a configuração do ambiente de desenvolvimento, instalação das dependências, execução do servidor, estrutura das páginas e exemplos de consumo da API.
