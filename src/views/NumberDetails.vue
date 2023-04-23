<template>
    <div class="details">
        <table class="table has-background-primary-light">
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
                    <td>{{ tableData.min }}</td>
                    <td>{{ tableData.max }}</td>
                    <td>{{ tableData.avg }}</td>
                    <td>{{ tableData.total }}</td>
                </tr>
            </tbody>
        </table>
        <!-- "num in storeNotes.numbers" :key="num.id" :num="num" -->
        <div class="card mb-2 has-text-justified has-background-primary" v-for="number in num.values" :key="number">
            {{ number.date }}: <strong class="has-text-grey-dark">{{ number.num }}</strong>
        </div>
    </div>
</template>

<script setup>
    import { reactive, onMounted, computed } from 'vue';
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

    const tableData = computed(() => {
        return {
            min: `${Math.round((num.min + Number.EPSILON) * 100) / 100}`,
            max: `${Math.round((num.max + Number.EPSILON) * 100) / 100}`,
            avg: `${Math.round((num.avg + Number.EPSILON) * 100) / 100}`,
            total: `${Math.round((num.total + Number.EPSILON) * 100) / 100}`
        }
    })
</script>