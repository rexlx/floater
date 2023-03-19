// stores/counter.js
import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { authApi } from "@/firebase/config.js";

export const useFirestore = defineStore('authStore', {
  state: () => {
    return {
    }
  },
  actions: {
    init() {
      onAuthStateChanged(authApi, (user) => {
        if (user) {
          const uid = user.uid
          console.log(uid, "is logged in")
        } else {

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
        console.log(err)
      })
    },
    login(creds) {
      signInWithEmailAndPassword(authApi, creds.email, creds.password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
      })
      .catch((error) => {
        const err = error.message
        console.log(error.code)
      })
    },
    logout() {
      signOut(authApi)
      .then(() => {
        console.log('signed out')
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
})