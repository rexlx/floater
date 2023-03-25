<template>
    <div class="card mb-4 has-background-info-light">
            <div class="card-content">
                <div class="content">
                    <div class="title has-text-centered">
                        {{ val }}
                    </div>
                {{ note }}
                </div>
                <div class="has-text-right has-text-info-dark mt-2">
                    <small>_ip_</small>
                </div>
            </div>
            <footer class="card-footer">
                <RouterLink href="#" :to="`/edit/${ note.id }`" class="card-footer-item has-text-grey-dark">edit</RouterLink>
                <a href="#" @click.prevent="storeNotes.deleteNote(note.id)" class="card-footer-item has-text-grey-dark">delete</a>
            </footer>
        </div>
</template>

<script setup>
import { computed } from "vue";
import { useStoreNotes } from '@/stores/noteStore.js'

const storeNotes = useStoreNotes()
const props = defineProps(['note', 'val'])
// const props = defineProps({
//     note: {
//         type: Number,
//         required: true
//     }, 
//     val: {
//         type: String,
//         required: false
//     }
// })


const util = computed(() => {
    let u = Number((props.note.demand/props.note.capacity)*100).toFixed(2)
    return `${u}%`
})

const friendlyTime = computed(() => {
    let d = new Date(props.note.date).toLocaleString()
    return `${ d }`
})

</script>