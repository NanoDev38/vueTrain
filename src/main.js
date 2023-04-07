import { createApp } from 'vue'
import App from './App.vue'
import router from "./route/router"

import './assets/main.css'

// const app = createApp(App,{
//     data() {
//       return {
//         counts: 0,
//         testName: "wow"
//       }
//     }
//   })
  
//   app.mount('#app')
const app = createApp(App)
app.use(router)
app.mount('#app')
