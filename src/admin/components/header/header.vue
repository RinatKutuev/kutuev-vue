<template>
    <div class="header-component">
        <headline title="Панель управления">
            <user />
        </headline>
        <navigation/>
    </div>
</template>

<script>

  import user from "../../components/user/user.vue";
  import headline from "../../components/headline/headline.vue";
  import navigation from "../../components/navigation/navigation.vue";

export default {
    components:{
        headline,
        user,
        navigation,
    }
}
</script>