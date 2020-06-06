<template>
    <div class="vase-page-item">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "VasePageItem",
        props: {
            direction: {type: String, default: ""},
        },
        mounted() {
            if (!this.$parent && !this.$parent.$data.hasOwnProperty("items")) return;
            this.$parent.$data.items.push(this.$el)
            this.$parent.$data.pageNum++
        }
    }
</script>

<style scoped>
    .vase-page-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
</style>
