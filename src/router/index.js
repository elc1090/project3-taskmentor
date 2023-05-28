import { createRouter, createWebHistory } from 'vue-router';
import CreateTask from "../components/CreateTask.vue";
import CreateUser from "../components/CreateUser.vue";
import ListTask from "../components/ListTask.vue";
import LoginUser from "../components/LoginUser.vue";
import EditTask from "../components/EditTask.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: CreateUser
    },
    {
        path: '/login',
        name: 'login',
        component: LoginUser
    }, 
    {
        path: '/:id/task',
        name: 'createTask',
        component: CreateTask
    },
    {
        path: '/:id/task/list',
        name: 'listTask',
        component: ListTask
    },
    {
        path: '/:idUser/task/edit/:id',
        name: 'editTask',
        component: EditTask
    }
]

const router = createRouter({
    history: createWebHistory(),
    // base: process.env.BASE_URL,
    routes
});

export default router;