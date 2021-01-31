<template>
    <div class="skill-component" v-if="editmode === false">
        <div class="title">{{skill.title}}</div>
        <div class="percent">{{skill.percent}}</div>
        <div class="buttons">
            <icon symbol="pencil" class="btn" @click="editmode = true" grayscale />
            <icon symbol="trash" class="btn" @click="$emit('remove', skill.id)" grayscale />
        </div>
    </div>
    <div class="skill-component" v-else>
        <div class="title">
            <app-input
                noSidePaddings
                v-model="currentSkill.title"
                :errorMessage="validation.firstError('currentSkill.title')"
            />
        </div>
        <div class="percent">
            <app-input
                type="number"
                v-model="currentSkill.percent"
                min="0" max="100" maxlength="3"
                :errorMessage="validation.firstError('currentSkill.percent')"
            />
        </div>
        <div class="buttons">
            <icon symbol="tick" class="btn" grayscale @click="$emit('approve', currentSkill); sendWork()" />
            <icon symbol="cross" class="btn" @click="editmode = false" grayscale />
        </div>
    </div>
</template>

<script>
import input from "../input/input.vue";
import icon from "../icon/icon.vue";

import {Validator, mixin} from 'simple-vue-validator';

export default {
    props:{
        skill:{
            type: Object,
            default: () => {},
            required: true
        }
    },
    data(){
        return {
            editmode: false,
            currentSkill: {
                id: 0,
                title: this.skill.title,
                percent: this.skill.percent
            }
        }
    },
    components: {
        icon,
        appInput: input
    },
    methods:{
        sendWork(){
            this.$validate().then(success=>{
                if(!success){
                    return
                }else{
                    console.log(this.currentSkill, 'send')
                }
            })
        }
    },
    validators:{
        'currentSkill.title': function(value){
            return Validator.value(value).required('Введите скилл')
        },
        'currentSkill.percent': function(value){
            return Validator.value(value).required('Введите проценты')
        }
    },
    mixins: [mixin]
}
</script>

<style lang="postcss" scoped src="./skill.pcss"></style>