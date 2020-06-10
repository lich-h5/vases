<template>
    <div class="vase-full-page">
        <slot></slot>
    </div>
</template>

<script>
    import {throttle} from "../../../utils/routine";

    export default {
        name: "VaseFullPage",
        data() {
            return {
                items: [],
                pageWidth: 0,
                pageHeight: 0,
                currentPosition: 0,
                touchPosition: 0,
            }
        },
        mounted() {
            if (this.$parent && this.$parent.$el.hasOwnProperty("style")) {
                this.$parent.$el.style.overflow = "hidden";
            }
            this.pageWidth = document.documentElement.clientWidth;
            this.pageHeight = document.documentElement.clientHeight;
            this.$el.style.width = this.pageWidth + "px";
            this.$el.style.height = this.pageHeight + "px";
            const handleWheel = throttle(this.onWheel, 800);
            this.$el.addEventListener("wheel", handleWheel);

            this.$el.addEventListener("touchstart", event => {
                this.touchPosition = event.touches[0].pageY;
            });
            const handleTouchEnd = throttle(this.onTouchEnd, 500);
            this.$el.addEventListener("touchend", handleTouchEnd);
        },
        methods: {
            onWheel(e) {
                if (e.deltaY > 0) {
                    this.pageDown()
                } else {
                    this.pageUp()
                }
            },
            onTouchEnd(e) {
                const touchEndY = e.changedTouches[0].pageY
                if (touchEndY - this.touchPosition < -20) { // 向上滑动, 页面向下滚动
                    this.pageDown()
                } else if (touchEndY - this.touchPosition > 20) {
                    this.pageUp()
                }
            },
            pageUp() {
                if (this.currentPosition < 0) {
                    this.currentPosition = this.currentPosition + this.pageHeight
                    this.$el.style.top = this.currentPosition + 'px'
                }
            },
            pageDown() {
                if (this.currentPosition > -this.pageHeight * (this.items.length - 1)) {
                    this.currentPosition = this.currentPosition - this.pageHeight
                    this.$el.style.top = this.currentPosition + 'px'
                }
            },
            pageTo(num) {
                this.currentPosition = -this.pageHeight * (num - 1)
                this.$el.style.top = this.currentPosition + 'px'
            }
        }
    }
</script>

<style scoped>
    .vase-full-page {
        position: relative;
        top: 0;
        transition: all 1000ms ease;
        touch-action: none;
    }
</style>
