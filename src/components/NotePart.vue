<template>
    <div class="card mb-4 has-background-info-light">
            <div class="card-content">
                <div class="content">
                {{ note.time }}: capacity: {{ note.capacity }} load: {{ note.load }}
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
const props = defineProps({
    note: {
        type: Object,
        required: true
    }
})


const charLength = computed(() => {
    let desc = props.note.content.length > 1 ? ' chars' : ' char'
    return `${ props.note.content.length } ${ desc }`
})

</script>