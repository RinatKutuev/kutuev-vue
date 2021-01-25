import Vue from "vue";

new Vue({
    el: "#menu-component",
    template: "#mobile-menu",
    data(){
        return{
            isActiveMenu: false
        }
    },
    methods:{
        toggleMenu(){
            this.isActiveMenu = !this.isActiveMenu
        }
    }
})