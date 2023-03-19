<template>
    <div class="notes">
        <AddNote v-model="newNote" ref="addNoteRef">
            <template #buttons>
                <button @click="addNote" :disabled="!newNote" class="button is-link">submit</button>
            </template>
        </AddNote>
        <NotePart v-for="note in storeNotes.conditions" :key="note.id" :note="note" />
        
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import NotePart from '../components/NotePart.vue';
import AddNote from '../components/AddNote.vue';
import { useStoreNotes } from "@/stores/noteStore.js";

const storeNotes = useStoreNotes()
onMounted(() => {
  storeNotes.getRtsc()
})

const newNote = ref('')
const addNoteRef = ref(null)
const addNote = () => {
    storeNotes.addNote(newNote.value)
    newNote.value = ''
    addNoteRef.value.refocus()
}

</script>