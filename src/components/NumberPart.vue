<template>
    <div class="card mb-4 has-background-info-light">
        <div class="title has-text-centered">
            {{ num.name }}
        </div>
        <div class="card-content">
            <div class="content has-text-centered">
                <!-- total: {{ num.total }}, average: {{ num.avg }} -->
                {{ summary }}
            </div>
        </div>
        <footer class="card-footer">
            <button @click.prevent="addNum" class="button has-background-info has-text-white" :disabled="!newNum">add</button>
            <input class="input" type="text" v-model="newNum">
                    
        </footer>
    </div>
</template>

<script setup>
import { useStoreNotes } from '@/stores/noteStore.js'
import { ref, computed } from "vue";

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

const summary = computed(() => {
    return `total: ${Math.round((props.num.total + Number.EPSILON) * 100) / 100}  average: ${Math.round((props.num.avg + Number.EPSILON) * 100) / 100}`
})
</script>