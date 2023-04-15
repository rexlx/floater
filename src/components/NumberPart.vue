<template>
    <div class="card mb-3 has-background-grey-darker">
                    <header class="card-header">
                        <p class="card-header-title has-background-link has-text-centered">
                            {{ num.name }}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content has-text-primary">
                            total: {{ num.total }}, average: {{ num.avg }}
                        </div>
                    </div>
                    <footer class="card-footer">
                        <button @click.prevent="addNum" class="button has-background-info-light" :disabled="!newNum">add</button>
                        <input class="input has-background-grey" type="text" v-model="newNum">
                             
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
    newNum.value = 0
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