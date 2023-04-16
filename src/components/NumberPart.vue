<template>
    <div class="card mb-3 has-background-grey-darker">
        <div class="title has-text-centered has-background-link">
            {{ num.name }}
        </div>
        <div class="card-content">
            <div class="content has-text-primary has-text-centered">
                total: {{ num.total }}, average: {{ num.avg }}
            </div>
        </div>
        <footer class="card-footer">
            <button @click.prevent="addNum" class="button has-background-link has-text-black" :disabled="!newNum">add</button>
            <input class="input has-background-success-light" type="text" v-model="newNum">
                    
        </footer>
    </div>
</template>

<script setup>
import { useStoreNotes } from '@/stores/noteStore.js'
import { ref } from "vue";

const props = defineProps(['modelValue', 'num',])
const emit = defineEmits(['update:modelValue'])
const newNum = ref(null)
const storeNotes = useStoreNotes()

const addNum = () => {
    let n = parseFloat(newNum.value)
    props.num.values.push(n)
    quickMaths(props.num)
    storeNotes.updateNumber(props.num.id, props.num)
    newNum.value = null
}

const quickMaths = (num) => {
    num.total = 0
    for (const i of num.values) {
        num.total += i
    }
    num.avg = num.total / num.values.length
    num.min = Math.min(...num.values)
    num.max = Math.max(...num.values)
}
</script>