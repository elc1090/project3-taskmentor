<template>
  <div>
    <nav class="navbar">
      <div class="navbar-brand">
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
          <li v-for="task in Tasks" :key="task._id" :class="{ 'task-item': true, 'task-completed': task.concluded }">
          <div class="task-details">
            <h3>{{ task.title }}</h3>
            <p>{{ task.description }}</p>
          </div>
          <div class="task-actions">
            <router-link class="btn btn-warning" :to="{ name: 'editTask', params: { idUser: this.$route.params.id, id: task._id }}">Editar</router-link>
            <a class="btn btn-danger" @click="deleteTask(task._id)">Deletar</a>
            <a class="btn btn-success" @click="markAsCompleted(task)">Concluir</a>
          </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";

export default {
    data() {
      return {
        Tasks: [],
        user: {}
      }
    },
    async created() {
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

.task-completed {
  opacity: 0.5;
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
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-details {
  flex-grow: 1;
}

.task-details h3 {
  margin: 0;
}

.task-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
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
  background-color: #232343;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
}

.navbar-brand {
  font-weight: bold;
}

.navbar-menu {
  display: flex;
  align-items: center;
}
.nav-item {
    list-style: none;
}
.nav-link {
  color: #fff;
  text-decoration: none;
  margin-right: 15px;
}
</style>