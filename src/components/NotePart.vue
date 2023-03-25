<template>
    <div class="card mb-4 has-background-info-light">
            <div class="card-content">
                <div class="content">
                    <div class="title has-text-centered">
                        {{ friendlyTime }}
                    </div>
                {{ note.content }}
                </div>
                <div class="has-text-right has-text-info-dark mt-2">
                    <small>..</small>
                </div>
            </div>
            <footer class="card-footer">
                <RouterLink href="#" :to="`/edit/${ note.id }`" class="card-footer-item has-text-grey-dark">edit</RouterLink>
                <a href="#" @click.prevent="modals.deleteNote = true" class="card-footer-item has-text-grey-dark">delete</a>
            </footer>
            <DeleteNote v-if="modals.deleteNote" v-model="modals.deleteNote" :noteId="note.id"/>
        </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useStoreNotes } from '@/stores/noteStore.js'
import DeleteNote from "@/components/DeleteNote.vue";

const storeNotes = useStoreNotes()
const props = defineProps({
    note: {
      type: Object,
      required: true
    }
  })


const modals = reactive({
    deleteNote: false
})

const friendlyTime = computed(() => {
    let d = new Date(props.note.date).toLocaleString()
    return `${ d }`
})


</script>