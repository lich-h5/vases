export function load(file, callback) {
    const img = document.createElement("img");
    let status = false;
    file = file.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (e) {
        img.src = this.result;
    }
    img.onload = function (e) {
        if (status) return
        status = true
        callback(img)
    }
}
