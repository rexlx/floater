<template>
    <div class="notes">
        <AddNote v-model="newNote" ref="addNoteRef">
            <template #buttons>
                <button @click="addNote" :disabled="!newNote" class="button is-link">submit</button>

            </template>
        </AddNote>
        <progress v-if="!storeNotes.isLoaded.notes" class="progress is-medium is-link" max="100" />
        <template v-else>
            <NotePart v-for="note in storeNotes.notes" :key="note.id" :note="note"/>
        </template>
        <!-- <NotePart v-for="note in storeNotes.notes" :key="note.id" :note="note"/> -->
        
    </div>
</template>

<script setup>
import {ref} from 'vue'
import NotePart from '../components/NotePart.vue';
import AddNote from '../components/AddNote.vue';
import { useStoreNotes } from "@/stores/noteStore.js";

const storeNotes = useStoreNotes()

const newNote = ref('')
const addNoteRef = ref(null)
const addNote = () => {
    storeNotes.addNote(newNote.value)
    newNote.value = ''
    addNoteRef.value.refocus()
}

// onMounted(() => {
//   storeNotes.init()
// })
</script>