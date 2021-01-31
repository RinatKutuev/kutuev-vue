<template>
    <div :class="['skill-add-component', {blocked: blocked}]">
        <div class="title">
            <app-input
            placeholder="Новый навык"
            v-model="skillData.skill"
            :errorMessage="validation.firstError('skillData.skill')"
            />
        </div>
        <div class="percent">
            <app-input placeholder="100"
            type="number"
            min="0" max="100" maxlength="3"
            v-model="skillData.percent"
            :errorMessage="validation.firstError('skillData.percent')"
            />
        </div>
        <div class="btn">
            <round-button title="+" @click="sendSkill()" />
        </div>
    </div>
</template>

<script>
import button from "../button/button.vue"
import input from "../input/input.vue"
import {Validator, mixin} from 'simple-vue-validator';

export default {
    props:{
        blocked: Boolean
    },
    data(){
        return{
            skillData:{
               skill: "",
               percent: "" 
            }
        }
    },
    components:{
        appInput: input,
        roundButton: button
    },
    methods:{
        sendSkill(){
            this.$validate().then(success=>{
                if(!success){
                    return
                }else{
                    console.log(this.skillData, 'send')
                }
            })
        }
    },
    validators:{
        'skillData.skill': function(value){
            return Validator.value(value).required('Введите скилл')
        },
        'skillData.percent': function(value){
            return Validator.value(value).required('Введите проценты')
        }
    },
    mixins: [mixin]
}
</script>



<style lang="postcss" scoped src="./skilladdline.pcss"></style>