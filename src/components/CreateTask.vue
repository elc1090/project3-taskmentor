<!-- <template>
    <div class="row justify-content-center">
        <div class="col-md-6">
        <h3 class="text-center">{{ formTitle }}</h3>
        <form @submit.prevent="handleSubmitForm">
            <div class="form-group">
                <label>Nome da tarefa</label>
                <input type="text" class="form-control" v-model="task.title" required>
            </div>

            <div class="form-group">
                <label>Descrição</label>
                <input type="text" class="form-control" v-model="task.description" required>
            </div>

            <div class="form-group">
                <button class="btn btn-danger btn-block">{{ submitButtonLabel }}</button>
            </div>
        </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            task: {
                title: "",
                description: "",
            },
            formTitle: "Criar uma tarefa",
            submitButtonLabel: "Criar Tarefa",
        };
    },
    methods: {
        handleSubmitForm() {
            let apiURL = "http://localhost:4000/api/tasks";

            if (this.$route.name === "EditTask") {
                // Rota de edição
                apiURL += `/${this.$route.params.id}`;
                axios
                .put(apiURL, this.task)
                .then(() => {
                    this.$router.push("/view");
                })
                .catch((error) => {
                    console.log(error);
                });
            } else {
                // Rota de criação
                console.log(this.task)
                axios
                .post(apiURL, this.task)
                .then(() => {
                    this.$router.push("/view");
                })
                .catch((error) => {
                    console.log("ee",error);
                });
            }

            this.task = {
                title: "",
                description: "",
            };
        },
    },
    created() {
        if (this.$route.name === "EditTask") {
            // Rota de edição - preenche o formulário com os dados da tarefa a ser editada
            this.formTitle = "Editar tarefa";
            this.submitButtonLabel = "Salvar Alterações";
            
            let apiURL = `http://localhost:4000/api/tasks/${this.$route.params.id}`;
            axios
            .get(apiURL)
            .then((response) => {
                this.task = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },
};
</script>
   -->

<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Crie uma tarefa</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Nome da tarefa</label>
                    <input type="text" class="form-control" v-model="student.name" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="student.email" required>
                </div>

                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" v-model="student.phone" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-danger btn-block">Criar uma conta</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            student: {
                name: '',
                email: '',
                phone: ''
            }
        }
    },
    methods: {
        handleSubmitForm() {
            let apiURL = 'http://localhost:4000/api/create-task';
            
            axios.post(apiURL, this.student).then(() => {
                this.$router.push('/view')
                this.student = {
                    name: '',
                    email: '',
                    phone: ''
                }
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>
