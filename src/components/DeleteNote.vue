<template>
    <div class="modal is-active p-2">
      <div class="modal-background"></div>
      <div
        class="modal-card"
        ref="modalCardRef"
      >
        <header class="modal-card-head">
          <p class="modal-card-title">delete note?</p>
          <button
            @click="closeModal"
            class="delete"
            aria-label="close"
          >
          </button>
        </header>
        <section class="modal-card-body">
          this will permanently remove the note...continue?
        </section>
        <footer class="modal-card-foot is-justify-content-flex-end">
          <button
            @click="closeModal"
            class="button"
          >
            cancel
          </button>
          <button
            @click="storeNotes.deleteNote(noteId)"
            class="button is-danger"
          >
            delete
          </button>
        </footer>
      </div>
    </div>
  </template>
  
  <script setup>

    import { ref, onMounted, onUnmounted } from 'vue'
    import { onClickOutside } from '@vueuse/core'
    import { useStoreNotes } from '@/stores/noteStore.js'

    const props = defineProps({
      modelValue: {
        type: Boolean,
        default: false
      },
      noteId: {
        type: String,
        required: true
      }
    })

    const emit = defineEmits(['update:modelValue'])

    const storeNotes = useStoreNotes()

    const closeModal = () => {
      emit('update:modelValue', false)
    }

    const modalCardRef = ref(null)
    onClickOutside(modalCardRef, closeModal)

    const handleKeyboard = e => {
      if (e.key === 'Escape') closeModal()
    }
    onMounted(() => {
      document.addEventListener('keyup', handleKeyboard)
    })
    onUnmounted(() => {
      document.removeEventListener('keyup', handleKeyboard)
    })
  </script>