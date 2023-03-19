<template>
 <div class="card has-background-black p-4">
            <div class="field">
                <div class="control">
                 <textarea
                   class="textarea"
                   placeholder="your text here"
                   ref="textAreaRef"
                   :value="modelValue"
                   @input="$emit('update:modelValue', $event.target.value)"
                   >
                </textarea>
                </div>
            </div>
            <div class="field is-grouped">
                <div class="control">
                    <slot name="buttons" />
                 </div>
            </div>
        </div>
</template>

<script setup>
import {ref} from 'vue'
const textAreaRef = ref(null)
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const refocus = () => {
    textAreaRef.value.focus()
}

defineExpose({
    refocus
})

</script>