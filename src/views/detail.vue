<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onBeforeMount } from "vue"
import detailData from "../data.json"

const carName = ref(null)
const route = useRoute();
const router = useRouter();

const { id } = route.params

// FINDING DATA WITH THE SAME ID
onBeforeMount(() => {
    carName.value = detailData.find(d => d.id === parseInt(id))
})
</script>
<template>
    <main>
        <div class="container">
            <h1>Detail</h1>
            <div v-if="carName">
                <p>MAKE : {{ carName.make }}</p>
                <p>MAKE : {{ carName.price }}</p>
            </div>
            <div v-else>
                <h1>Detail Not Found</h1>
            </div>
            <button @click="router.back()">Go Back</button>
        </div>
    </main>
</template>