<template>
    <div class="numbers">
        <progress v-if="!storeNotes.isLoaded.numbers" class="progress is-medium is-link" max="100" />
        <template v-else>
            <div class="card">
                <input class="input is-link" type="text" placeholder="name" v-model="newName" >
                <button @click="createData" class="button">create</button>
            </div>
            <div v-for="num in storeNotes.numbers" :key="num.id" :num="num">
                <NumbersPart :num="num" v-model="newValue">
                    <template #buttons>
                        <button @click.prevent="addNum" class="button is-link" :disabled="!num">add</button>
                    </template>
                </NumbersPart>
            </div>
            <div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useStoreNotes } from "@/stores/noteStore.js";
import NumbersPart from '../components/NumberPart.vue'

const storeNotes = useStoreNotes()
const newValue = ref('')
const addValueRef = ref(null)
const newName = ref('')

const createData = () => {
    let d = Date.now()
    let num = {
                date: d,
                name: newName.value,
                values: [],
                total: 0,
                avg: 0,
                max: 0,
                min: 0
    }
    storeNotes.createNumberTracker(num)
    newName.value = ''
}

onMounted(() => {
    storeNotes.getNumbers()
    console.log()
})

const addNum = () => {
    console.log(newValue, "dbug")
}

</script>
