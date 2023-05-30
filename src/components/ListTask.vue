<template>
  <div>
    <nav class="navbar">
      <div class="navbar-brand">
        <div class="logo">
          <img :src="logo" style="width: 80px; height: auto" />
        </div>
        <span>{{ user.name }}</span>
      </div>
      <div class="navbar-menu">
        <ul>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'createTask', params: { id: this.$route.params.id }}">Voltar</router-link>
            <router-link class="nav-link" :to="{ name: 'login' }"> Sair </router-link>
          </li>  
        </ul>
      </div>
    </nav>
    <div>
      <div class="task-list-container">
        <ul class="task-list">
          <li v-if="Tasks.length === 0" class="task-item">
            <div class="task-details no-task">
              <h3>Não há tarefas</h3>
              <router-link class="button-new-task" :to="{ name: 'createTask', params: { id: this.$route.params.id }}">Criar uma nova tarefa</router-link>
            </div>
          </li>
          <li v-else v-for="task in Tasks" :key="task._id" :class="{ 'task-item': true, 'task-completed': task.concluded }">
            <div class="task-details">
              <h3>{{ task.title }}</h3>
              <p>{{ task.description }}</p>
            </div>
            <div class="task-actions">
              <router-link v-if="!task.concluded" class="btn btn-warning" :to="{ name: 'editTask', params: { idUser: this.$route.params.id, id: task._id }}">Editar</router-link>
              <button v-else class="btn btn-warning btn-disabled" disabled>Editar</button>
              <button v-if="!task.concluded" class="btn btn-danger" @click="deleteTask(task._id)">Excluir</button>
              <button v-else class="btn btn-danger btn-disabled" disabled>Excluir</button>
              <button v-if="!task.concluded" class="btn btn-success" @click="markAsCompleted(task)">Concluir</button>
              <button v-else class="btn btn-success btn-disabled" disabled>Concluir</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import logo from '../assets/logo.png';

export default {
    data() {
      return {
        Tasks: [],
        user: {},
        logo
      }
    },
    async beforeCreate() {
      const id = this.$route.params.id;
      let apiURL = `https://project3-taskmentor-api.vercel.app/api/task/${ id }`;
      let apiURLUser = `https://project3-taskmentor-api.vercel.app/api/${this.$route.params.id}`;

      
      const user = await axios.get(apiURLUser)
      if(user.data){
        this.user = user.data
      }

      const task = await axios.get(apiURL)
      if(task.data){
        this.Tasks = task.data
      }
    },
    methods: {
      deleteTask(id){
        let apiURL = `https://project3-taskmentor-api.vercel.app/api/task/delete-task/${id}`;

        let indexOfArrayItem = this.Tasks.findIndex(i => i._id === id);

        if (window.confirm("Deseja excluir?")) {
          axios.delete(apiURL).then(() => {
              this.Tasks.splice(indexOfArrayItem, 1);
          }).catch(error => {
              console.log(error)
          });
        }
      },
      async markAsCompleted(task) {
        const taskId = task._id;
        const completed = true;

        let apiURL = `https://project3-taskmentor-api.vercel.app/api/task/update-task/${taskId}`;
        task.concluded = completed;

        const { data } = await axios.post(apiURL, { concluded: completed })
        if(data){
          console.log('Tarefa concluída com sucesso!');
        }
      }
    }
}
</script>

<style>
.navbar {
  background-color: #f2f2f2;
  padding: 10px;
}

.btn {
  cursor: pointer;
  border: none;
}

.btn-disabled{
  background-color: lightgray;
  cursor: not-allowed;
}

.task-completed {
  opacity: 0.6;
}

.navbar-brand {
  font-weight: bold;
}

.task-list-container {
  margin-top: 10px;
  width: auto;
}

.task-list {
  list-style-type: none;
  padding: 0;
}

.task-item {
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: #fff;
}

.btn-warning {
  background-color: #ffc107;
}

.btn-danger {
  background-color: #dc3545;
}

.btn-success {
  background-color: #28a745;
}

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

.no-task{
  text-align: center;
  padding: 20px;
  flex-grow: 1;
}

.task-details h3 {
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 10px;
  margin: 0;
}

.task-details .button-new-task {
  display: inline-block;
  padding: 10px 20px;
  background-color: #9292da;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 15px;
}

.task-details .button-new-task:hover {
  background-color: #232343;
}
</style>