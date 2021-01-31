<template>
    <div class="user-component">
        <div class="image">
            <avatar size="3.1" :src="userPic" />
        </div>
        <div class="username">Ринат Kутуев</div>
    </div>
</template>

<script>
    import avatar from "../avatar/avatar"
    export default {
        components:{
            avatar
        },
        computed:{
            userPic(){
                return require("../../../images/content/user.jpg").default
            }
        }
    }
</script>

<style lang="postcss" scoped src="./user.pcss"></style>