<template>
    <div class="works-page-component">
        <div class="page-content">
            <div class="container">
				<div class="header">
					<div class="title">
						Блок «Работы»
					</div>
				</div>
                <work-form v-if="formIsShown"  @cancel="formCancel()" />
                <div class="works">
                    <div class="works-adder">
                        <app-button type="square" @click="formIsShown = true" />
                    </div>
                    <div class="work" v-for="work in works" :key="work.id">
                        <work-card 
                            :work="work"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import workForm from "../../components/workForm/workForm";
import appButton from "../../components/button/button.vue";
import workCard from "../../components/workCard";

import { mapState, mapActions } from "vuex"
import WorkCard from '../../components/workCard/workCard.vue';

export default {
    components:{
        appButton,
        workForm,
        workCard
    },
    data(){
        return{
            formIsShown: false
        }
    },
    computed:{
        ...mapState("works", {
            works: (state) => state.data
        }),
        
    },
    methods:{
        ...mapActions({
            fetchWorks: "works/fetch"
        }),

        formCancel(){
            this.formIsShown = false
        }
    },
    mounted(){
        this.fetchWorks();
    }
}

</script>

<style lang="postcss" scoped src="./works.pcss"></style>
<style lang="postcss" scoped src="../../app.pcss"></style>