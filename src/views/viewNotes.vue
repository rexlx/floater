<template>
    <div class="notes">
        <!-- <AddNote v-model="newNote" ref="addNoteRef">
            <template #buttons>
                <button @click="addNote" :disabled="!newNote" class="button is-link">submit</button>
            </template>
        </AddNote> -->
        <Line :data="storeNotes.demand_data" />
        <NotePart v-for="note, val in storeNotes.current" :key="note.id" :note="note" :val="val"/>
        
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import NotePart from '../components/NotePart.vue';
import AddNote from '../components/AddNote.vue';
import { useStoreNotes } from "@/stores/noteStore.js";
import { Line } from 'vue-chartjs'
import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend } from 'chart.js'

  ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

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