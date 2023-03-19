import { createRouter, createWebHashHistory } from 'vue-router'
import ViewNotes from '@/views/ViewNotes.vue'
import EditNote from '@/views/EditNote.vue'
import ViewStats from '@/views/ViewStats.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'notes',
            component: ViewNotes
        },
        {
            path: '/edit/:id',
            name: 'edit-note',
            component: EditNote
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/stats',
            name: 'stats',
            component: ViewStats
        }
    ]
})

export default router