/**
 * 节流
 * @param fn
 * @param delay
 * @returns {function(...[*]=)}
 */
export function throttle(fn, delay) {
    let timer = null;
    let startTime = Date.now();
    return function () {
        const curTime = Date.now();
        const remaining = delay - (curTime - startTime);
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        if (remaining <= 0) {
            fn.apply(context, args);
            startTime = Date.now();
        } else {
            timer = setTimeout(fn, remaining);
        }
    }
}

/**
 * 防抖
 * @param fn
 * @param delay
 * @returns {function(...[*]=)}
 */
export function debounce(fn, delay) {
    let timeout = null;
    return function () {
        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(fn, delay);
    }
}
