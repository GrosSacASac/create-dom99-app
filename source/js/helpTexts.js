export { start, stop };
import * as d from "./dependencies.js";


const showHelp = function () {
    d.elements.showHelp.remove();
    d.feed(`helpText`, helpText);
};

const start = function () {
    d.functions.showHelp = showHelp;
};
