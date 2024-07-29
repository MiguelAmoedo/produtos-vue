<template>
    <div class="diver">
    <header class="header">
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/criar">Criar Produto</a></li>
        </ul>
      </nav>
    </header>
</div>
  </template>
  
  <script lang="ts" setup>
  </script>
  
  <style scoped>

  .diver {
 padding-bottom: 1rem;
  }
  .header {
    background-color: #007bff;
    color: white;
    padding: 10px;
  }
  
  nav ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;

  }
  
  nav ul li {
    margin: 0;
  }
  
  nav ul li a {
    color: white;
    text-decoration: none;
    font-weight: bold;

  }
  
  nav ul li a:hover {
    text-decoration: underline;
  }
  </style>
  