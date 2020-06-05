/**
 * 节流
 * @param method
 * @param delay
 */
export function throttle(method, delay) {
    let _this = throttle.prototype;
    _this.current = new Date();
    if (!_this.begin) {
        _this.begin = _this.current;
    }
    clearTimeout(_this.timer);
    if (_this.current - _this.begin >= delay) {
        method();
        _this.begin = _this.current;
    } else {
        _this.timer = setTimeout(method, delay);
    }
}
