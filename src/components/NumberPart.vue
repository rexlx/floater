<template>
    <div class="card">
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
                        <input 
                            class="input is-link"
                            type="text"
                            placeholder="enter value"
                            :value="modelValue"
                            @input="$emit('update:modelValue', $event.target.value)"
                             >
                        <div class="control">
                            <slot name="buttons" />
                        </div>
                             
                    </footer>
                </div>
</template>

<script setup>
import { useStoreNotes } from '@/stores/noteStore.js'
import { ref } from "vue";

const props = defineProps(['modelValue', 'num'])
const emit = defineEmits(['update:modelValue'])
const newNum = ref(0)
const storeNotes = useStoreNotes()


</script>