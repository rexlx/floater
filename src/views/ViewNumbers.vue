<template>
    <div class="numbers">
        <progress v-if="!storeNotes.isLoaded.numbers" class="progress is-medium is-link" max="100" />
        <template v-else>
            <div class="card mb-3 has-background-dark">
                <input class="input is-link has-background-primary-light" type="text" placeholder="new list name" v-model="newName" >
                <button @click="createData" class="button has-background-success">create</button>
            </div>
            <div v-for="num in storeNotes.numbers" :key="num.id" :num="num">
                <NumbersPart :num="num" v-model="newValue">
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
import notie from 'notie'

const storeNotes = useStoreNotes()
const newValue = ref(null)
const addValueRef = ref(null)
const newName = ref('')

const createData = () => {
    if (newName.value !== "") {
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
    } else {
        notie.alert({
            type: "error",
            text: "new list must have a name!"
        })
    }
    newName.value = ''
}

onMounted(() => {
    storeNotes.getNumbers()
})



</script>
