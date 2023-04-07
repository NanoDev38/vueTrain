import { createRouter, createWebHistory } from "vue-router"
import homepage from "../views/homepage.vue"
import aboutView from "../views/about.vue"
import detailView from "../views/detail.vue"
import notFoundView from "../views/notFound.vue"
import subPage from "../views/subPage.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: homepage
        },
        {
            path: "/about",
            name: "about",
            component: aboutView,
            children:[{
                path:"sub-page",
                component: subPage
            }]
        },
        {
            path: "/detail/:id",
            name: "detail",
            component: detailView
        },
        {
            path: "/:pathMatch(.*)*",
            name: "404",
            component: notFoundView,
        }
    ]
})

export default router