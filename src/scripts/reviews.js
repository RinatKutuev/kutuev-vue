import Vue from "vue";
import Flickity from 'vue-flickity';

new Vue({
    el: "#review-component",
    template: "#slider-container",
    components:{
        Flickity
    },
    data(){
        return{
            reviews: [],
            prevDis: true,
            nextDis: false,
            flickityOptions:{
                groupCells: true,
                prevNextButtons: false,
                pageDots: false,
                wrapAround: false
            }
        }
    },
    methods:{
        checkArrow(e){
            if(this.$refs.flickity.selectedIndex() === 0){
                this.prevDis = true
            }else{
                this.prevDis = false
            }

            if(this.$refs.flickity.selectedIndex() === this.$refs.flickity.$flickity.slides.length - 1){
                this.nextDis = true
            }else{
                this.nextDis = false
            }
        },
        setImagePath(){
            this.reviews = this.reviews.map(item => {
                item.image = require(`../images/content/${item.image}`).default;
                return item
            })
        },
        next() {
            this.$refs.flickity.next();
        },
        prev() {
            this.$refs.flickity.previous();
        }
    },
    mounted(){
        this.setImagePath()
        let ref = this.$refs;

    },
    created(){
        this.reviews = require("../data/reviews.json");
    }
})