<template>
    <div class="charts">
      <progress v-if="!storeNotes.isLoaded.charts" class="progress is-medium is-link" max="100" />
        <template v-else>
          <Line :data="storeNotes.spp_data" />
          <Line :data="storeNotes.demand_data" />
          <Line :data="getDirectConnects" />
        </template>
        
        <!-- <NotePart v-for="note, val in storeNotes.current" :key="note.id" :note="note" :val="val"/> -->
        
    </div>
</template>

<script setup>
import {computed, onMounted} from 'vue'
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
  storeNotes.getSpp()
  storeNotes.getRtsc()
})

const parseByKey = (keyName) => {
  let lineColor = `#${Math.floor(Math.random()*16777215).toString(16)}`
  let tmp = {
          label: keyName,
          backgroundColor: lineColor,
          data: []
        }
  for (let d of storeNotes.conditions) {
    tmp.data.push(d[keyName])
  }
  return tmp
}

const getLabels = () => {
  let lbs = []
  for (let d of storeNotes.conditions) {
    let l = new Date(d['time']).toLocaleString()
    lbs.push(l)
  }
  return lbs
}

const getDirectConnects = computed(() => {
  let lbs = getLabels()
  let dcData = {labels: lbs, datasets: []}
  let keys = ['dc_e', 'dc_l', 'dc_n', 'dc_r', 'dc_s']
  for (let k of keys) {
    let dataset = parseByKey(k)
    dcData.datasets.push(dataset)
  }
  return dcData
})

</script>