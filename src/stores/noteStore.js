// imports
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

// firebase collection references
let notesColRef
let numbersColRef

// snapshot refs for unsub method
let unsubFromNotes = null
let unsubFromNumbers = null
let unsubFromRTSC = null
let unsubFromSPP = null

export const useStoreNotes = defineStore('NotesStore', {
  state: () => {
    return {
        notes: [],
        conditions: [],
        numbers: [],
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
            charts: false,
            numbers: false
        }
    }
  },
  actions: {
    init() {
        const storeAuth = useFirestore()
        notesColRef = collection(db, "users", storeAuth.user.id, "notes")
        numbersColRef = collection(db, "users", storeAuth.user.id, "numbers")
        this.getNotes()
        // this.getRtsc()
    },
    async getRtsc() {
        this.isLoaded.charts = false
        this.checkSnapshot(unsubFromRTSC)
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
        unsubFromRTSC = onSnapshot(q, (qs) => {
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
        this.checkSnapshot(unsubFromNotes)
        const q = query(notesColRef, orderBy("date", "desc"), limit(10))
        unsubFromNotes = onSnapshot(q, (qs) => {
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
    async getNumbers() {
        this.isLoaded.numbers = false
        this.checkSnapshot(unsubFromNumbers)
        const q = query(numbersColRef, orderBy("date", "desc"), limit(10))
        unsubFromNumbers = onSnapshot(q, (qs) => {
            this.numbers = []
            qs.forEach((doc) => {
                let num = {
                    id: doc.id,
                    date: doc.data().date,
                    name: doc.data().name,
                    values: doc.data().values,
                    total: doc.data().total,
                    avg: doc.data().avg,
                    max: doc.data().max,
                    min: doc.data().min
                }
                this.numbers.push(num)
            })
        this.isLoaded.numbers = true
        })
    },
    async getSpp() {
        this.checkSnapshot(unsubFromSPP)
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
        unsubFromSPP = onSnapshot(q, (qs) => {
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
      },
    async createNumberTracker(val) {
    const docRef = await addDoc(numbersColRef, {
            date:   val.date,
            name:   val.name,
            values: val.values,
            total:  val.total,
            avg:    val.avg,
            max:    val.max,
            min:    val.min
        })
    },
    async updateNumber(id, val) {
        await updateDoc(doc(numbersColRef, id), {
            values: val.values,
            total:  val.total,
            avg:    val.avg,
            max:    val.max,
            min:    val.min
        })
      },
      async deleteNumber(id) {
        await deleteDoc(doc(numbersColRef, id))
      },
      checkSnapshot(ss) {
        // if a previous user was logged in, their snapshot will still hold a value
        if (ss) {
            // calling the () method on it calls unsub
            ss()
        }
      }
  },
  getters: {
    getNoteContent: (state) => {
        return (id) => {
            return state.notes.filter(note => note.id === id )[0].content
          }
    },
    getNumberDetails: (state) => {
        return (id) => {
            return state.numbers.filter(n => n.id === id )[0]
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