// stores/counter.js
import { defineStore } from 'pinia'
import { 
    collection,
    onSnapshot,
    query,
    limit,
    doc,
    deleteDoc,
    orderBy,
    addDoc,
    updateDoc
 } from "firebase/firestore";
import { db } from "@/firebase/config.js";
import { useFirestore } from "@/stores/authStore.js";

let notesColRef
export const useStoreNotes = defineStore('NotesStore', {
  state: () => {
    return {
        notes: [],
        conditions: [],
        demand_data: {
            labels: [],
            datasets: []
          },
        cpu_data: {
            labels: [],
            datasets: []
          },
        current: {},
        isLoaded: {
            notes: false,
            charts: false
        }
    }
  },
  actions: {
    init() {
        const storeAuth = useFirestore()
        notesColRef = collection(db, "users", storeAuth.user.id, "notes")
        this.getNotes()
    },
    async getRtsc() {
        this.isLoaded.charts = false
        this.demand_data.labels = []
        this.demand_data.datasets = []
        this.conditions = []
        let tmp = {
            label: 'demand',
            backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
            data: []
          }
          let tmp2 = {
            label: 'capacity',
            backgroundColor: '#fd5301',
            data: []
          }
        const q = query(collection(db, "capacity-aggregator"), orderBy("time", "desc"), limit(24))
        onSnapshot(q, (qs) => {
            qs.forEach((doc) => {
                this.conditions.unshift(doc.data())
                let d = new Date(doc.data().time).toLocaleString()
                let dmd = Number(doc.data().demand).toFixed(2)
                let cap = Number(doc.data().cap).toFixed(2)
                this.demand_data.labels.unshift(d)
                tmp.data.unshift(dmd)
                tmp2.data.unshift(cap)
            })
            this.demand_data.datasets.push(tmp)
            this.demand_data.datasets.push(tmp2)
            this.current = this.conditions[23]
            this.isLoaded.charts = true
        })
    },
    async getNotes() {
        this.isLoaded.notes = false
        const q = query(notesColRef, orderBy("date", "desc"), limit(10))
        onSnapshot(q, (qs) => {
            this.notes = []
            qs.forEach((doc) => {
                let note = {
                    id: doc.id,
                    content: doc.data().content,
                    date: doc.data().date
                }
                this.notes.push(note)
            })
        this.isLoaded.notes = true
        })
    },
    async getCpu() {
        this.cpu_data.labels = []
        this.cpu_data.datasets = []
        let tmp = {
            label: 'cpu usage',
            backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
            data: []
          }
        const q = query(collection(db, "cpu-aggregator"), orderBy("time", "desc"), limit(24))
        onSnapshot(q, (qs) => {
            qs.forEach((doc) => {
                let d = new Date(doc.data().time).toLocaleString()
                let dmd = Number(doc.data().percent_used).toFixed(5)
                this.cpu_data.labels.unshift(d)
                tmp.data.unshift(dmd)
            })
            this.cpu_data.datasets.push(tmp)
        })
    },
    async addNote(val) {
        let d = Date.now()
        const docRef = await addDoc(notesColRef, {
            date: d,
            content: val
          })
    },
    async deleteNote(id) {
        await deleteDoc(doc(notesColRef, id))
    },
    async updateNote(id, content) {
        await updateDoc(doc(notesColRef, id), {
            content: content,
            date: Date.now()
        })
      }
  },
  getters: {
    getNoteContent: (state) => {
        return (id) => {
            return state.notes.filter(note => note.id === id )[0].content
          }
    },
    totalNotesCount: (state) => {
        return state.notes.length
    },
    totalCharactersCount: (state) => {
        let count = 0
        state.notes.forEach(note => {
          count += note.content.length
        })
        return count
      }
  }
})