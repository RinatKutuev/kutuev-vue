import Vue from "vue";
import VueRouter from 'vue-router';
import store from "./store";
import axios from "axios";

Vue.use(VueRouter)

import header from "./components/header"
import about from "./pages/about"
import login from "./pages/login"
import works from "./pages/works"


const routes = [
    {
        path: "/",
        components: {
            default: about,
            header: header
        }
    },
    {
        path: "/login",
        component: login,
        meta:{
            public: true
        }
    },
    {
        path: "/works",
        components: {
            default: works,
            header: header
        }
    },
]

const router = new VueRouter({ routes })

const guard = axios.create({
    daseURL: "https://webdev-api.loftschool.com",

})

router.beforeEach(async(to, from, next) => {
    const isPublicRoute = to.matched.some(route => route.meta.public);
    const userIsLoginedIn = store.getters["user/userIsLoginedIn"]

    if(isPublicRoute === false && userIsLoginedIn === false){
        const token = localStorage.getItem("token");

        guard.defaults.headers["Authorization"] = `Bearer ${token}`;

        try{
            const response = await guard.get("/user");
            store.dispatch("user/login", await response.data.user)
            next();
        } catch(error){
            router.replace("/login");
            localStorage.removeItem("token");
        }

    } else{
        next()
    }

    
})

export default router