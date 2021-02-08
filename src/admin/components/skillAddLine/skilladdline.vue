<template>
    <div :class="['skill-add-component', {blocked: blocked}]">
        <div class="title">
            <app-input
            placeholder="Новый навык"
            v-model="skill.title"
            :errorMessage="validation.firstError('skill.title')"
            />
        </div>
        <div class="percent">
            <app-input placeholder="100"
            type="number"
            min="0" max="100" maxlength="3"
            v-model="skill.percent"
            :errorMessage="validation.firstError('skill.percent')"
            />
        </div>
        <div class="btn">
            <round-button title="+" @click="handleClick()" />
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
            skill: {
               title: "",
               percent: "" 
            }
        }
    },
    components:{
        appInput: input,
        roundButton: button
    },
    methods:{
        async handleClick(){
            if(await this.$validate() === false) return
            this.$emit("approve", this.skill)
        },
        // handleClick(){
        //     this.$validate().then(success=>{
        //         if(success == false){
        //             return
        //         }else{
        //             this.$emit("approve", this.skill)
        //         }
        //     })
        // }
    },
    validators:{
        'skill.title': function(value){
            return Validator.value(value).required('Введите скилл')
        },
        'skill.percent': function(value){
            return Validator.value(value)
            .required('Введите проценты')
            .integer('Должно быть числом')
            .between(0, 100, "Некорректное значение")
        }
    },
    mixins: [mixin]
}
</script>



<style lang="postcss" scoped src="./skilladdline.pcss"></style>