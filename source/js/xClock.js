export { updateTime };
import * as d from "../../node_modules/dom99/source/dom99.js";


const updateTime = () => {
    d.feed(`time`, new Date().toLocaleString());
};
