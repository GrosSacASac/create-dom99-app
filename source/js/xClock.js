export { updateTime };
import * as d from "../../node_modules/dom99/built/dom99ES.js";


const updateTime = () => {
    d.feed(`time`, new Date().toLocaleString());
};
