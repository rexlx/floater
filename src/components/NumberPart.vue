<template>
    <div class="card mb-4 has-background-info-light">
        <div class="title has-text-centered" @click="getDeatils(num.id)">
            {{ num.name }}
        </div>
        <div class="card-content" @click="getDeatils(num.id)">
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
import { useRoute, useRouter } from 'vue-router'

// const newValue = ref(null)
// const addValueRef = ref(null)
// const newName = ref('')
// const route = useRoute()
const router = useRouter()

const props = defineProps(['modelValue', 'num',])
const emit = defineEmits(['update:modelValue'])
const newNum = ref(null)
const storeNotes = useStoreNotes()

const addNum = () => {
    let d = new Date().toLocaleString()
    let n = {
        date: d,
        num: parseFloat(newNum.value)
    }
    props.num.values.push(n)
    quickMaths(props.num)
    storeNotes.updateNumber(props.num.id, props.num)
    newNum.value = null
}

const quickMaths = (num) => {
    num.total = 0
    for (const i of num.values) {
        num.total += i.num
    }
    num.avg = num.total / num.values.length
    num.min = Math.min(...num.values)
    num.max = Math.max(...num.values)
}

const getDeatils = async (id) => {
    router.push(`/numbers/${id}`)
}

const summary = computed(() => {
    return `total: ${Math.round((props.num.total + Number.EPSILON) * 100) / 100}  average: ${Math.round((props.num.avg + Number.EPSILON) * 100) / 100}`
})
</script>