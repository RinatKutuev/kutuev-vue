<template>
  <div class="app-container">
    <headline title="Панель управления">
      <user />
    </headline>
    <navigation/>
    <div class="page-content">
      <div class="container">
        <div class="header">
          <div class="title">
            Блок «Обо мне»
          </div>
          <iconed-button
          v-if="emptyCatIsShown === false"
          type="iconed"
          title="Добавить группу"
          @click="emptyCatIsShown = true"
          />
        </div>
        <ul class="skills">
          <li class="item" v-if="emptyCatIsShown">
            <category
              @remove="emptyCatIsShown = false"
              empty
            />
          </li>
          <li class="item" v-for="category in categories" :key="category.id">
            <category
              :title="category.category"
              :skills="category.skills"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import user from "./components/user/user.vue";
  import headline from "./components/headline/headline.vue";
  import navigation from "./components/navigation/navigation.vue";
  import button from "./components/button/button.vue";
  import category from "./components/category/category.vue";

  export default {
    components: {
      headline,
      user,
      navigation,
      iconedButton: button,
      category
    },
    data(){
      return {
        categories: [],
        emptyCatIsShown: false 
      }
    },
    created(){
      this.categories = require("./data/category.json")
    }
  }
</script>

<style lang="postcss">
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&display=swap');
  @import "normalize.css";
  @import "../styles/mixins.pcss";
  @import "../styles/layout/base.pcss";
</style>

<style lang="postcss" scoped src="./app.pcss"></style>