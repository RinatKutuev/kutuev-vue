<template>
    <div class="headline-component">
        <div class="container">
            <slot />
            <div class="title">{{ title }}</div>
            <div class="btns">
                <button type="button" class="logout">Выйти</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>

<style lang="postcss" scoped src="./headline.pcss"></style>