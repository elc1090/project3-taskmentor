<template>
    <div>
        <nav class="navbar">
            <div class="navbar-brand">
                <span>{{ user.name }}</span>
            </div>
            <div class="navbar-menu">
                <ul>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'listTask', params: { id: this.$route.params.id }}">Minhas tarefas</router-link>
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

export default {
    data() {
        const task = {
            title: "",
            description: ""
        }
        const user = {}

        return {
            task,
            user
        }
    },
    async created() {
        // let apiURL = `http://localhost:4000/api/${this.$route.params.id}`;
        let apiURL = `https://project3-taskmentor-api.vercel.app/api/${this.$route.params.id}`
        await axios.get(apiURL).then((res) => {
            this.user = res.data;
        })
    },
    methods: {
        handleSubmitForm() {
            // let apiURL = "http://localhost:4000/api/task/create-task";
            let apiURL = "https://project3-taskmentor-api.vercel.app/api/task/create-task";
            this.task.user = this.$route.params.id;
            axios.post(apiURL, this.task)
                .then(() => {
                    this.$router.push(`${this.$route.href}/list`)
                })
                .catch(error => {
                    console.log(error);
            });
        }
    }
};
</script>

<style scoped>
.navbar {
  background-color: #232343;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
}

.nav-item{
    list-style: none;
}

.navbar-brand {
  font-weight: bold;
}

.navbar-menu {
  display: flex;
  align-items: center;
}
.nav-link {
  color: #fff;
  text-decoration: none;
}
.container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    flex-direction: column;
}
.text-center {
    text-align: center;
}
.form-group {
    margin-bottom: 15px;
}
.form-control {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.btn-task {
    background-color: #232343;
    color: #fff;
    padding: 10px 20px;
    cursor: pointer;
}
</style>