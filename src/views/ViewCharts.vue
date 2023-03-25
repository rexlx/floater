<template>
    <div class="charts">
      <progress v-if="!storeNotes.isLoaded.charts" class="progress is-medium is-link" max="100" />
        <template v-else>
          <Line :data="storeNotes.demand_data" />
        </template>
        
        <!-- <NotePart v-for="note, val in storeNotes.current" :key="note.id" :note="note" :val="val"/> -->
        
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
// import NotePart from '../components/NotePart.vue';
// import AddNote from '../components/AddNote.vue';
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

</script>