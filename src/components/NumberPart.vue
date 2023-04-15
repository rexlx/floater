<template>
    <div class="card mb-3">
                    <header class="card-header">
                        <p class="card-header-title">
                            {{ num.name }}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            {{ num.total }}
                        </div>
                    </div>
                    <footer class="card-footer">
                        <button @click.prevent="addNum" class="button is-link" :disabled="!newNum">add</button>
                        <input class="input" type="text" v-model="newNum">
                             
                    </footer>
                </div>
</template>

<script setup>
import { useStoreNotes } from '@/stores/noteStore.js'
import { ref } from "vue";

const props = defineProps(['modelValue', 'num',])
const emit = defineEmits(['update:modelValue'])
const newNum = ref(0)
const storeNotes = useStoreNotes()

const addNum = () => {
    let n = parseFloat(newNum.value)
    props.num.values.push(n)
    storeNotes.updateNumber(props.num.id, props.num.values)
    newNum.value = 0
}
</script>