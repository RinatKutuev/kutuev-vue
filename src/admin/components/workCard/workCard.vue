<template>
    <div class="work-card-component">
        
            <div class="work-header">
                <div class="work-img">
                    <img :src="cover" alt="">
                </div>
                <div class="work-tags">
                    <tag-list :tags="work.techs"/>
                </div>
            </div>
            <div class="work-content">
                <div class="work-title">
                    {{work.title}}
                </div>
                <div class="work-text">
                    {{work.description}}
                </div>
                <div class="work-link"><a :href="work.link">{{work.link}}</a></div>
                <div class="work-control">
                    <a href="#">Править <icon symbol="pencil" /></a>
                    <a href="#">Удалить <icon symbol="cross" /></a>
                </div>
            </div>
        
    </div>
</template>

<script>
import tagList from "../../components/tagList";
import icon from "../../components/icon/icon";
export default {
    components:{
        tagList,
        icon
    },
    props:{
        work: Object
    },
    computed:{
        cover(){
            return `https://webdev-api.loftschool.com/${this.work.photo}`
        }
    }
}
</script>

<style lang="postcss" scoped src="./workCard.pcss"></style>