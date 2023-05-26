import { createRouter, createWebHistory } from 'vue-router';
// import CreateTask from "../components/CreateTask.vue";7
import CreateUser from "../components/CreateUser.vue";
// import ListTask from "../components/ListTask.vue";
import LoginUser from "../components/LoginUser.vue";
import EditTask from "../components/EditTask.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: CreateUser
    },
    {
        path: '/view/:id',
        name: 'view',
        component: LoginUser
    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: EditTask
    }
]

const router = createRouter({
    history: createWebHistory(),
    // base: process.env.BASE_URL,
    routes
});

export default router;