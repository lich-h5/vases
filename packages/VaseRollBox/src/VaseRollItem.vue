<template>
    <li class="vase-roll-item" :style="style">
        <slot></slot>
    </li>
</template>

<script>
    export default {
        name: "VaseRollItem",
        mounted() {
            if (!this.$parent && !this.$parent.hasOwnProperty("addItem")) return;
            this.$parent.addItem(this.$el)
        },
        computed: {
            style() {
                if (this.$parent.$props.orientation === "v") {
                    return {
                        width: this.$parent.$props.width + "px",
                        height: this.$parent.$props.height + "px",
                        display: "flex",
                        "justify-content": "center",
                        "align-items": "center",
                        overflow: "hidden"
                    }
                } else {
                    return {
                        width: this.$parent.$props.width + "px",
                        height: this.$parent.$props.height + "px",
                        float: "left",
                        overflow: "hidden"
                    }
                }

            }
        }
    }
</script>
