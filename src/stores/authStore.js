// stores/counter.js
import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { authApi } from "@/firebase/config.js";
import { useStoreNotes } from "@/stores/noteStore";
export const useFirestore = defineStore('authStore', {
  state: () => {
    return {
      user: {}
    }
  },
  actions: {
    init() {
      const storeNotes = useStoreNotes()
      onAuthStateChanged(authApi, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          storeNotes.init()
        } else {
          this.user = {}
          // this.router.push("/login")
        }
      })
    },
    register(creds) {
      createUserWithEmailAndPassword(authApi, creds.email, creds.password)
      .then((userCredential) => {
        const user = userCredential.user
      })
      .catch((error) => {
        const err = error.message
      })
    },
    login(creds) {
      signInWithEmailAndPassword(authApi, creds.email, creds.password)
      .then((userCredential) => {
        const user = userCredential.user
      })
      .catch((error) => {
        const err = error.message
      })
    },
    logout() {
      signOut(authApi)
      .then(() => {
        console.log('signed out')
      })
      .catch((err) => {
        // do thing
      })
    }
  }
})