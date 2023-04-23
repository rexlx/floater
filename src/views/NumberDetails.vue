<template>
    <div class="details">
        <table class="table has-background-info-light">
            <thead>
                <tr>
                    <th>min</th>
                    <th>max</th>
                    <th>average</th>
                    <th>total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ num.min }}</td>
                    <td>{{ num.max }}</td>
                    <td>{{ num.avg }}</td>
                    <td>{{ num.total }}</td>
                </tr>
            </tbody>
        </table>
        <!-- "num in storeNotes.numbers" :key="num.id" :num="num" -->
        <div class="card mb-2 has-text-justified has-background-primary" v-for="number in num.values" :key="number">
            {{ number.date }}: {{ number.num }}
        </div>
    </div>
</template>

<script setup>
    import { reactive, onMounted } from 'vue';
    import { useStoreNotes } from "@/stores/noteStore.js";
    import { useRoute } from 'vue-router'

    const storeNotes = useStoreNotes()
    const route = useRoute()

    const num = reactive({
        min: 0,
        max: 0,
        avg: 0,
        total: 0,
        values: []
    })

    const setDetails = async (num) => {
        let n = storeNotes.getNumberDetails(route.params.id)
        num.min = n.min
        num.max = n.max
        num.avg = n.avg
        num.total = n.total
        num.values = n.values
    }

    onMounted(() => {
        setDetails(num)
    })
</script>