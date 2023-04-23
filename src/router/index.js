import { createRouter, createWebHashHistory } from 'vue-router'
import { useFirestore } from "@/stores/authStore.js"
import ViewNotes from '@/views/ViewNotes.vue'
import EditNote from '@/views/EditNote.vue'
import ViewNumbers from '@/views/ViewNumbers.vue'
import ViewCharts from '@/views/ViewCharts.vue'
import LoginView from '@/views/LoginView.vue'
import NumberDetails from '@/views/NumberDetails.vue'

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
            path: '/charts',
            name: 'charts',
            component: ViewCharts
        },
        {
            path: '/numbers',
            name: 'numbers',
            component: ViewNumbers
        },
        {
            path: '/numbers/:id',
            name: 'NumberDetails',
            component: NumberDetails
        }
    ]
})

router.beforeEach(async (t, f) => {
    const authStore = useFirestore()
    if (!authStore.user.id &&  t.name !== "login") {
        return {name: 'login'}
    }
    if (authStore.user.id && t.name === "login") {
        return {name: 'notes'}
    }
})

export default router