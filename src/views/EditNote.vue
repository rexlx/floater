<template>
    <div class="edit-note">
        <AddNote ref="addNoteRef" v-model="content">
            <template #buttons>
                <button class="button is-warning" @click="$router.back()">cancel</button>
                <button class="button is-warning" @click="handleSaveClicked" :disabled="!content">save</button>
            </template>
        </AddNote>
    </div>
</template>

<script setup>
import { useStoreNotes } from '@/stores/noteStore.js'
import AddNote from '../components/AddNote.vue';
import {ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'

const content = ref('')
const storeNotes = useStoreNotes()
const route = useRoute()
const router = useRouter()
content.value = storeNotes.getNoteContent(route.params.id)
const handleSaveClicked = () => {
    storeNotes.updateNote(route.params.id, content.value)
    router.push("/")
}
</script>