<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">
    <div class="title" v-if="editmode === false">
      <div class="text">{{value}}</div>
      <div class="icon">
        <icon symbol="pencil" grayscale @click="editmode = true"></icon>
      </div>
    </div>
    <div v-else class="title">
      <div class="input">
        <app-input
          placeholder="Название новой группы"
          :value="value"
          :errorText="errorText"
          @input="$emit('input', $event)"
          @keydown.native.enter="onApprove"
          autofocus="autofocus"
          no-side-paddings="no-side-paddings"
          v-model="groupTitle"
          :errorMessage="validation.firstError('groupTitle')"
        ></app-input>
      </div>
      <div class="buttons">
        <div class="button-icon">
          <icon symbol="tick" @click="onApprove"></icon>
        </div>
        <div class="button-icon">
          <icon symbol="cross" @click="$emit('remove')"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Validator, mixin} from 'simple-vue-validator';
export default {
  props: {
    value: {
      type: String,
      default: ""
    },
    errorText: {
      type: String,
      default: ""
    },
    editModeByDefault: Boolean,
    blocked: Boolean
  },
  data() {
    return {
      editmode: this.editModeByDefault,
      groupTitle: this.value,
    };
  },
  methods: {
    onApprove() {
      this.$validate().then(success=>{
          if(success == false){
              return
          }
          else if(this.groupTitle.trim() === this.value.trim()){
            this.editmode = false;
            this.$emit("approve", this.value);
          }
      })
    }
  },
  components: {
    icon: () => import("components/icon"),
    appInput: () => import("components/input")
  },
  validators:{
    groupTitle: function(value){
      return Validator.value(value).required('Введите название')
    }
  },
  mixins: [mixin]
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>