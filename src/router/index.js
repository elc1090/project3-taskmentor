import { createRouter, createWebHistory } from 'vue-router';
import CreateTask from "../components/CreateTask.vue";
import ListTask from "../components/ListTask.vue";
import EditTask from "../components/EditTask.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: CreateTask
    },
    {
        path: '/view',
        name: 'view',
        component: ListTask
    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: EditTask
    }
]

const router = createRouter({
    history: createWebHistory(),
    base: process.env.BASE_URL,
    routes
});

export default router;