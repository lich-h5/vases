<template>
    <div class="vase-image" :style="imageStyle">
        <img v-bind="$attrs" v-on="$listeners" :src="src" alt=""/>
        <slot/>
    </div>
</template>

<script>
    export default {
        name: 'VaseImage',

        inheritAttrs: false,

        props: {
            src: String,
            mode: String,
            lazy: Boolean,
            width: "",
            height: "",
        },

        data() {
            return {
                loading: true,
                error: false,
                show: !this.lazy,
                imageWidth: 0,
                imageHeight: 0,
            };
        },

        computed: {
            imageStyle() {
                if (this.loading) return;
                switch (this.mode) {
                    case "cover":
                    case "contain":
                        return {
                            "background-image": "url('" + this.src + "')",
                            "background-position": "center center",
                            "background-repeat": "no-repeat",
                            "background-size": this.mode,
                            "width": this.width,
                            "height": this.height,
                        }
                    case "fitWidth":
                        return {
                            "background-image": "url('" + this.src + "')",
                            "background-position": "center center",
                            "background-repeat": "no-repeat",
                            "background-size": this.width + " " + this.fitWithWidth + "px",
                            "width": this.width,
                            "height": this.fitWithWidth + "px",
                        }
                    case "fitHeight":
                        return {
                            "background-image": "url('" + this.src + "')",
                            "background-position": "center center",
                            "background-repeat": "no-repeat",
                            "background-size": this.fitWithHeight + "px " + this.height,
                            "width": this.fitWithHeight + "px",
                            "height": this.height,
                        }
                    default:
                        return {
                            "background-image": "url('" + this.src + "')",
                            "background-position": "center center",
                            "background-repeat": "no-repeat",
                            "background-size": this.width + " " + this.height,
                            "width": this.width,
                            "height": this.height,
                        }
                }
            },
            fitWithWidth() {
                let scale = this.$el.offsetWidth / this.imageWidth
                return (scale * this.imageHeight)
            },
            fitWithHeight() {
                let scale = this.$el.offsetHeight / this.imageHeight
                return (scale * this.imageWidth)
            },
        },

        watch: {
            src(val) {
                this.show && this.loadImage();
            },
            show(val) {
                val && this.loadImage();
            }
        },

        mounted() {
            if (this.lazy) {
                this.addLazyLoadListener();
            } else {
                this.loadImage();
            }
        },

        beforeDestroy() {
            this.lazy && this.removeLazyLoadListener();
        },

        methods: {
            loadImage() {
                if (this.$isServer) return;

                // reset status
                this.loading = true;
                this.error = false;

                const img = new Image();
                img.onload = e => this.handleLoad(e, img);
                img.onerror = this.handleError.bind(this);

                // bind html attrs
                // so it can behave consistently
                Object.keys(this.$attrs)
                    .forEach((key) => {
                        const value = this.$attrs[key];
                        img.setAttribute(key, value);
                    });
                img.src = this.src;
            },
            handleLoad(e, img) {
                this.imageWidth = img.width;
                this.imageHeight = img.height;
                this.loading = false;
                this.$emit('load', e);
            },
            handleError(e) {
                this.loading = false;
                this.error = true;
                this.$emit('error', e);
            },
            handleLazyLoad() {
                // if (isInContainer(this.$el, this._scrollContainer)) {
                //     this.show = true;
                //     this.removeLazyLoadListener();
                // }
            },
            addLazyLoadListener() {
                // if (this.$isServer) return;
                //
                // const {scrollContainer} = this;
                // let _scrollContainer = null;
                //
                // if (isHtmlElement(scrollContainer)) {
                //     _scrollContainer = scrollContainer;
                // } else if (isString(scrollContainer)) {
                //     _scrollContainer = document.querySelector(scrollContainer);
                // } else {
                //     _scrollContainer = getScrollContainer(this.$el);
                // }
                //
                // if (_scrollContainer) {
                //     this._scrollContainer = _scrollContainer;
                //     this._lazyLoadHandler = throttle(200, this.handleLazyLoad);
                //     on(_scrollContainer, 'scroll', this._lazyLoadHandler);
                //     this.handleLazyLoad();
                // }
            },
            removeLazyLoadListener() {
                // const {_scrollContainer, _lazyLoadHandler} = this;
                //
                // if (this.$isServer || !_scrollContainer || !_lazyLoadHandler) return;
                //
                // off(_scrollContainer, 'scroll', _lazyLoadHandler);
                // this._scrollContainer = null;
                // this._lazyLoadHandler = null;
            },
        }
    };
</script>
<style scoped>
    .vase-image {
        position: relative;
        display: block;
        overflow: hidden;
    }

    .vase-image img {
        display: block;
        opacity: 0;
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
