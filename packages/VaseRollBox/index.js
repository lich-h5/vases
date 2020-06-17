import VaseRollBox from "./src/VaseRollBox";
import VaseRollItem from "./src/VaseRollItem";

VaseRollBox.install = function (Vue) {
    Vue.component(VaseRollBox.name, VaseRollBox);
};

VaseRollItem.install = function (Vue) {
    Vue.component(VaseRollItem.name, VaseRollItem);
};

export {VaseRollBox, VaseRollItem}
