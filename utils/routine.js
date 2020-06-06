/**
 * 节流
 * @param fn
 * @param delay
 * @returns {function(...[*]=)}
 */
export function throttle(fn, delay) {
    let timer = undefined;
    let lastCallTime = Date.now();
    return function () {
        const timeSinceLastCall = Date.now() - lastCallTime;
        const shouldCall = timeSinceLastCall >= delay;
        if (shouldCall) {
            timer = setTimeout((fn.apply(this, arguments), (timer = undefined)), delay);
            lastCallTime = Date.now();
        }
    };
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
