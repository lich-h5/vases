<template>
    <div id="vase-divider">
        <span class="content">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: "VaseDivider",
    }
</script>

<style scoped>
    #vase-divider {
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        align-items: center;
    }

    #vase-divider::before, #vase-divider::after {
        content: '';
        height: 1px;
        top: 50%;
        flex-grow: 1;
        background: #dcdfe6;
    }

    #vase-divider .content {
        margin: 0 10px;
    }

    #vase-divider .content:empty {
        display: none;
    }
</style>
