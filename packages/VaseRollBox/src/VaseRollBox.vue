<template>
    <div class="vase-roll-box" :style="style">
        <ul ref="list" class="roll-list" :style="ulWidth">
            <slot></slot>
        </ul>
    </div>
</template>

<script>
    import {throttle} from "../../../utils/routine";

    export default {
        name: "VaseRollBox",
        props: {
            /**
             * 可视区域宽度
             */
            width: {type: Number, default: 300},
            /**
             * 可视区域高度
             */
            height: {type: Number, default: 300},
            /**
             * 滚动方向
             * h：水平 v：垂直
             */
            orientation: {type: String, default: "v"},
            /**
             * 自动滚动
             * 参数大于1000（1s）启动自动滚动
             */
            auto: {type: Number, default: 0},
            /**
             * 循环滚动
             */
            loop: {type: Boolean, default: false}
        },
        data() {
            return {
                list: null, // list dom
                items: [],
                currentItem: 0,
                currentPosition: 0,
                touchPosition: 0,
            }
        },
        mounted() {
            this.list = this.$refs['list']

            const handleWheel = throttle(this.onWheel, 800);
            this.list.addEventListener("mousewheel", handleWheel);

            this.list.addEventListener("touchstart", event => {
                if (this.orientation === "v") {
                    this.touchPosition = event.touches[0].pageY;
                } else {
                    this.touchPosition = event.touches[0].pageX;
                }
            });
            const handleTouchEnd = throttle(this.onTouchEnd, 500);
            this.list.addEventListener("touchend", handleTouchEnd);

            setInterval(this.autoRun, this.auto)
        },
        computed: {
            style() {
                return {
                    width: this.width + "px",
                    height: this.height + "px",
                }
            },
            ulWidth() {
                if (this.orientation === "h") {
                    return {
                        width: this.items.length * this.width + "px"
                    }
                }
            }
        },
        methods: {
            addItem(item) {
                this.items.push(item)
            },
            onWheel(e) {
                if (e.deltaY > 0) {
                    this.pageDown()
                } else {
                    this.pageUp()
                }
            },
            onTouchEnd(e) {
                let touchEnd = 0
                if (this.orientation === "v") {
                    touchEnd = e.changedTouches[0].pageY
                } else {
                    touchEnd = e.changedTouches[0].pageX
                }

                if (touchEnd - this.touchPosition < -20) { // 向上滑动, 页面向下滚动
                    this.pageDown()
                } else if (touchEnd - this.touchPosition > 20) {
                    this.pageUp()
                }
            },
            pageUp() {
                let offset = this.orientation === "v" ? this.height : this.width
                if (this.currentPosition < 0) {
                    this.currentPosition = this.currentPosition + offset
                    if (this.orientation === "v") {
                        this.list.style.top = this.currentPosition + 'px'
                    } else {
                        this.list.style.left = this.currentPosition + 'px'
                    }
                    this.currentItem--
                    this.$emit("change", this.currentItem)
                } else {
                    if (this.loop) {
                        this.pageTo(this.items.length - 1)
                    }
                }
            },
            pageDown() {
                let offset = this.orientation === "v" ? this.height : this.width
                if (this.currentPosition > -offset * (this.items.length - 1)) {
                    this.currentPosition = this.currentPosition - offset
                    if (this.orientation === "v") {
                        this.list.style.top = this.currentPosition + 'px'
                    } else {
                        this.list.style.left = this.currentPosition + 'px'
                    }
                    this.currentItem++
                    this.$emit("change", this.currentItem)
                } else {
                    if (this.loop) {
                        this.pageTo(0)
                    }
                }
            },
            pageTo(num) {
                if (this.orientation === "v") {
                    this.currentPosition = -this.height * num
                    this.list.style.top = this.currentPosition + 'px'
                } else {
                    this.currentPosition = -this.width * num
                    this.list.style.left = this.currentPosition + 'px'
                }
                this.currentItem = num
                this.$emit("change", this.currentItem)
            },
            autoRun() {
                if (this.auto > 999) {
                    this.pageDown()
                }
            }
        }
    }
</script>

<style scoped>
    .vase-roll-box {
        position: relative;
        overflow: hidden;
    }

    ul {
        list-style-type: none;
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0;
        margin-inline-end: 0;
        padding-inline-start: 0;
    }

    .roll-list {
        position: relative;
        touch-action: none;
        display: block;
        top: 0;
        left: 0;
        transition: all 1000ms ease;
    }
</style>
