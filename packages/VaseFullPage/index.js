import VaseFullPage from "./src/VaseFullPage";
import VasePageItem from "./src/VasePageItem";

VaseFullPage.install = function (Vue) {
    Vue.component(VaseFullPage.name, VaseFullPage);
};

VasePageItem.install = function (Vue) {
    Vue.component(VasePageItem.name, VasePageItem);
};

export {VaseFullPage, VasePageItem}
