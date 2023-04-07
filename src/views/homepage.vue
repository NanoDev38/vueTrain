<script setup>
import dataCars from "../data.json";
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

// const count = ref(0);

// const increment = () => {
//   count.value++;
// };
// const decrement = () => {
//   count.value--;
// };

const router = useRouter()
const route = useRoute()

const isShow = ref(false)

const noteVal = ref("")
const errorNoteVal = ref("")

const existNote = ref([])

function randColor() {
    return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
}

const addNote = () => {
    if (noteVal.value.trim.length < 10) {
        return errorNoteVal.value = "Text Should be 10 Character or more"
    }
    existNote.value.push({
        id: Math.floor(Math.random() * 10000),
        value: noteVal.value,
        date: new Date(),
        bgColor: randColor()
    })
    isShow.value = false;
    noteVal.value = "";
    errorNoteVal.value = "";
}

const carsData = ref(dataCars)
const carOptions = ref("")

onMounted(() => {
    console.log(route.query);
    carOptions.value = route.query.carOptions || ""
})
watch(carOptions, () => {
    if (carOptions.value) {
        if (carOptions.value === "all") {
            carsData.value = dataCars;
        } else {
            carsData.value = dataCars.filter(c => c.make === carOptions.value)
        }
    }
})

const handleChange = () => {
    router.push({ query: { carOptions: carOptions.value } })
}
// onMounted(() => {
//   console.log(`The initial count is ${count.value}.`);
// });
</script>

<template>
    <main>
        <div v-if="isShow" class="overlay">
            <div class="modal">
                <textarea v-model.trim="noteVal" name="noteForm" id="" cols="30" rows="10"></textarea>
                <p v-if="errorNoteVal">{{ errorNoteVal }}</p>
                <button @click="addNote()">Submit</button>
                <button @click="isShow = false" class="closeButton">close</button>
            </div>
        </div>
        <div class="container">
            <!-- <div class="links">
                                                                                    <a href="/">Home</a>
                                                                                    <a href="/about">About</a>
                                                                                </div> -->
            <header>
                <h1>Notes</h1>
                <!-- <button class="addNoteButton" @click="isShow = true">+</button> -->
            </header>
            <select @change="handleChange" v-model="carOptions">
                <option value="all">All</option>
                <option value="Porsche">Porsche</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Audi">Audi</option>
            </select>
            <div class="cards-container">
                <!-- <div v-for="note in existNote" :key="note.id" class="cards" :style="{ backgroundColor: note.bgColor }">
                                                                                                                      <p class="main-text">
                                                                                                                        {{ note.value }}
                                                                                                                      </p>
                                                                                                                      <p class="date">{{ note.date.toLocaleDateString("en-ID") }}</p>
                                                                                                                    </div> -->

                <div @click="router.push(`/detail/${car.id}`)" v-for="car in carsData" class="cards">
                    <h3>{{ car.make }}</h3>
                    <p>${{ car.price }}</p>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
main {
    height: 100vh;
    width: 100vw;
}

.cards-container {
    display: flex;
    flex-wrap: wrap;
}

.container {
    max-width: 1000px;
    padding: 10px;
    margin: 0 auto;
}

.container .links a {
    margin-right: 20px;
}

header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

h1 {
    font-weight: bold;
    margin-bottom: 25px;
    font-size: 55px;
}

.addNoteButton {
    border: none;
    padding: 10px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    background-color: rgb(21, 20, 20);
    border-radius: 100%;
    color: white;
    font-size: 20px;
}

.cards {
    width: 225px;
    height: 225px;
    background-color: black;
    padding: 20px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 20px;
    margin-bottom: 20px;
    color: white;
}

.date {
    font-size: 12px;
    font-weight: bold;
}

.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.77);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal {
    width: 750px;
    background-color: white;
    border-radius: 10px;
    padding: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
}

.modal button {
    padding: 10px 20px;
    font-size: 20px;
    width: 100%;
    background-color: orange;
    border: none;
    color: white;
    cursor: pointer;
    margin-top: 20px;
}

.modal .closeButton {
    background-color: red;
    margin-top: 10px;
}

.modal p {
    color: red;
}
</style>