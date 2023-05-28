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
                    </li>  
                </ul>
            </div>
        </nav>
        <div>
        <table class="table">
            <thead>
            <tr>
                <th>Título</th>
                <th>Descrição</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="task in Tasks" :key="task._id">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td>
                    <router-link class="btn btn-warning" :to="{ name: 'editTask', params: { idUser: this.$route.params.id, id: task._id }}">Editar</router-link>
                    <a class="btn btn-danger" @click="deleteTask(task._id)">Deletar</a>
                    <a class="btn btn-success">Concluir</a>
                </td>
            </tr>
            </tbody>
        </table>
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
    created() {
        const id = this.$route.params.id;
        let apiURL = `http://localhost:4000/api/task/${ id }`;
        let apiURLUser = `http://localhost:4000/api/${this.$route.params.id}`;
        
        axios.get(apiURLUser).then((res) => {
            this.user = res.data;
        })

        axios.get(apiURL).then(res => {
            this.Tasks = res.data;
        })
    },
    methods: {
        deleteTask(id){
            let apiURL = `http://localhost:4000/api/task/delete-task/${id}`;
            let indexOfArrayItem = this.Tasks.findIndex(i => i._id === id);

            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.Tasks.splice(indexOfArrayItem, 1);
                }).catch(error => {
                    console.log(error)
                });
            }
        }
    }
}
</script>
<style scoped>
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
}
.table {
    width: 100%;
    border-collapse: collapse;
}
  
.table th,
.table td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
}
  
.table th {
    background-color: #f2f2f2;
    font-weight: bold;
    text-align: left;
}
  
.btn {
    display: inline-block;
    padding: 6px 12px;
    margin-left: 10px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    border: 1px solid transparent;
    border-radius: 4px;
}
  
.btn-success {
    color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c;
}
  
.btn-danger {
    color: #fff;
    background-color: #d9534f;
    border-color: #d43f3a;
}

.btn-warning {
    color: #fff;
    background-color: #f0ad4e;
    border-color: #eea236;
}

.btn-success:hover,
.btn-success:focus,
.btn-success:active,
.btn-success.active,
.open .dropdown-toggle.btn-success {
    background-color: #449d44;
    border-color: #398439;
}

.btn-danger:hover,
.btn-danger:focus,
.btn-danger:active,
.btn-danger.active,
.open .dropdown-toggle.btn-danger {
    background-color: #c9302c;
    border-color: #ac2925;
}

.btn-warning:hover,
.btn-warning:focus,
.btn-warning:active,
.btn-warning.active,
.open .dropdown-toggle.btn-warning {
    background-color: #ec971f;
    border-color: #d58512;
}
</style>