// stores/counter.js
import { defineStore } from 'pinia'
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
import { db } from "@/firebase/config.js";

export const useStoreNotes = defineStore('NotesStore', {
  state: () => {
    return {
        notes: [
            {
                id: 1,
                content: "i can move through time and space but",
                date: '20230101'
            },
            {
                id: 2,
                content: "space grinder moves space and time finer",
                date: '20230101'
            },
            {
                id: 3,
                content: "finds a way to convince us we dont mind it",
                date: '20230101'
            }
        ],
        conditions: [],
        demand_data: {
            labels: [],
            datasets: []
          },
          current: {}
    }
  },
  actions: {
    async getRtsc() {
        this.demand_data.labels = []
        this.demand_data.datasets = []
        this.conditions = []
        let tmp = {
            label: 'demand',
            backgroundColor: '#221f5b',
            data: []
          }
          let tmp2 = {
            label: 'capacity',
            backgroundColor: '#fd5301',
            data: []
          }
        const q = query(collection(db, "capacity-aggregator"), orderBy("time", "desc"), limit(24))
        const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
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
    this.current = this.conditions[this.conditions.length-1]
    },
    addNote(val) {
        let d = new Date()
        let note = {
            id: d.getTime(),
            content: val,
            date: d
        }
      this.notes.unshift(note)
    },
    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id)
    },
    updateNote(id, content) {
        let index = this.notes.findIndex(note => note.id === id )
        console.log("update called", id, content, index, this.notes[0])
        this.notes[index].content = content
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