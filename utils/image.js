export function load(file, callback) {
    const img = document.createElement("img");
    file = file.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        img.src = this.result;
        img.onload = function () {
            (callback && callback(img))
        }
    }
}
