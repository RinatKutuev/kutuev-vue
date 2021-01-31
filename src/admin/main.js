import Vue from 'vue';
import App from './App.vue'
import SimpleVueValidation from 'simple-vue-validator';
Vue.use(SimpleVueValidation, {mode: "manual"});

new Vue({
  el: "#app-root",
  render: h => h(App)
});