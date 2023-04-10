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
        spp_data: {
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
    async getSpp() {
        this.spp_data.labels = []
        this.spp_data.datasets = []
        let tmp = {
            label: 'hb hub avg',
            backgroundColor: `#${Math.floor(Math.random()*956265600).toString(16)}`,
            data: []
          }
          let tmp2 = {
            label: 'hb bus avg',
            backgroundColor: `#${Math.floor(Math.random()*956265600).toString(16)}`,
            data: []
          }
        const q = query(collection(db, "spp_aggregator"), orderBy("time", "desc"), limit(16))
        onSnapshot(q, (qs) => {
            qs.forEach((doc) => {
                let d = new Date(doc.data().time).toLocaleString()
                let ha = Number(doc.data().data.hb_hub_avg).toFixed(5)
                let ba = Number(doc.data().data.hb_bus_avg).toFixed(5)
                this.spp_data.labels.unshift(d)
                tmp.data.unshift(ha)
                tmp2.data.unshift(ba)
            })
            this.spp_data.datasets.push(tmp)
            this.spp_data.datasets.push(tmp2)
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