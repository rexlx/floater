<template>
    <div class="details">
        <table class="table">
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
        <div class="detail mb-2" v-for="number in num.values" :key="number">
            <p>date: {{ number.date }} <br>
                amount: {{ number.num }}
            </p>
        </div>
    </div>
</template>

<script setup>
    import { reactive, onMounted } from 'vue';
    import { useStoreNotes } from "@/stores/noteStore.js";
    import { useRoute, useRouter } from 'vue-router'

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
    const storeNotes = useStoreNotes()
    const route = useRoute()

    onMounted(() => {
        setDetails(num)
    })
</script>