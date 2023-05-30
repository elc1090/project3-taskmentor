<template>
  <div class="task">
    <nav class="navbar">
      <div class="navbar-brand">
        <div class="logo">
          <img :src="logo" />
        </div>
        <span>{{ user.name }}</span>
      </div>
      <div class="navbar-menu">
        <ul>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'listTask', params: { id: this.$route.params.id }}">Minhas tarefas</router-link>
            <router-link class="nav-link" :to="{ name: 'login' }"> Sair </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <h3 class="text-center">Crie uma tarefa</h3>
      <form @submit.prevent="handleSubmitForm" class="form">
        <div class="form-group">
          <label for="taskTitle">Título da tarefa</label>
          <input
            id="taskTitle"
            type="text"
            class="form-control"
            v-model="task.title"
            required
          />
        </div>

        <div class="form-group">
          <label for="taskDescription">Descrição</label>
          <input
            id="taskDescription"
            type="text"
            class="form-control"
            v-model="task.description"
            required
          />
        </div>

        <div class="form-group">
          <button class="btn-task">Criar uma tarefa</button>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import logo from '../assets/logo.png';

export default {
    data() {
      const task = {
        title: "",
        description: ""
      }
      const user = {}

      return {
        task,
        user,
        logo
      }
    },
    async beforeCreate() {
      let apiURL = `https://project3-taskmentor-api.vercel.app/api/${this.$route.params.id}`
      const { data } = await axios.get(apiURL);
      if(data){
        this.user = data;
      }
    },
    methods: {
      async handleSubmitForm() {
        let apiURL = "https://project3-taskmentor-api.vercel.app/api/task/create-task";
        this.task.user = this.$route.params.id;
      
        const { data } = await axios.post(apiURL, this.task)
        if(data){
          this.$router.push(`${this.$route.href}/list`)
        }
      }
    }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #232343;
  padding: 15px 20px;
  color: #fff;
}
.logo img {
  width: 90px;
  height: auto;
}

.nav-item{
  list-style: none;
}
.navbar-brand span {
  margin-left: 10px;
  font-weight: bold;
}

.nav-item {
  display: inline-block;
  margin-left: 10px;
}

.nav-link {
  text-decoration: none;
  color: #fff;
  margin-right: 15px;
}

.navbar-menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.btn-task {
  background-color: #232343;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  color: #fff;
  border-radius: 5px;
}

.btn-task:hover {
  background-color: #555577;
}

.container {
  margin: 0 auto;
  max-width: 450px;
  flex-direction: column; 
  margin-top: 10px;
}

.text-center {
  text-align: center;
  margin-top: 20px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

</style>